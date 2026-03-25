"""orders/views.py"""
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Cart, CartItem, Order, OrderItem, Coupon
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer, CheckoutSerializer
from accounts.models import Address
from products.models import Product


# ─── Cart ─────────────────────────────────────────────────────────────────────

class CartView(APIView):
    """GET /api/orders/cart/"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart, context={'request': request}).data)


class CartItemView(APIView):
    """POST/PATCH/DELETE /api/orders/cart/items/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """Add item to cart"""
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity   = int(request.data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id, status=Product.Status.ACTIVE)

        if product.track_inventory and product.stock < quantity:
            return Response({'error': f'Only {product.stock} units available.'},
                            status=status.HTTP_400_BAD_REQUEST)

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()

        return Response(CartSerializer(cart, context={'request': request}).data)

    def patch(self, request, item_id):
        """Update cart item quantity"""
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()

        return Response(CartSerializer(cart, context={'request': request}).data)

    def delete(self, request, item_id):
        """Remove item from cart"""
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()
        return Response(CartSerializer(cart, context={'request': request}).data)


class CheckoutView(APIView):
    """POST /api/orders/checkout/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        cart = get_object_or_404(Cart, user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        address = get_object_or_404(Address, id=data['address_id'], user=request.user)

        # Calculate pricing
        subtotal = cart.total
        discount = 0
        coupon   = None

        if data.get('coupon_code'):
            try:
                coupon = Coupon.objects.get(
                    code=data['coupon_code'],
                    is_active=True,
                    valid_from__lte=timezone.now(),
                    valid_to__gte=timezone.now(),
                )
                if coupon.min_order <= subtotal:
                    discount = coupon.calculate_discount(subtotal)
                    coupon.used_count += 1
                    coupon.save(update_fields=['used_count'])
            except Coupon.DoesNotExist:
                return Response({'error': 'Invalid or expired coupon.'},
                                status=status.HTTP_400_BAD_REQUEST)

        shipping_charge = 0 if subtotal >= 500 else 50  # Free shipping above ₹500
        total = subtotal - discount + shipping_charge

        # Create order
        order = Order.objects.create(
            user=request.user,
            shipping_name=address.full_name,
            shipping_phone=address.phone,
            shipping_line1=address.line1,
            shipping_line2=address.line2,
            shipping_city=address.city,
            shipping_state=address.state,
            shipping_pincode=address.pincode,
            shipping_country=address.country,
            coupon=coupon,
            subtotal=subtotal,
            discount=discount,
            shipping_charge=shipping_charge,
            total=total,
            payment_method=data['payment_method'],
            notes=data.get('notes', ''),
        )

        # Create order items and deduct stock
        for cart_item in cart.items.select_related('product').all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                product_name=cart_item.product.name,
                product_sku=cart_item.product.sku,
                unit_price=cart_item.product.price,
                quantity=cart_item.quantity,
                total=cart_item.subtotal,
            )
            if cart_item.product.track_inventory:
                cart_item.product.stock -= cart_item.quantity
                cart_item.product.save(update_fields=['stock'])

        cart.items.all().delete()  # Clear cart

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    """GET /api/orders/"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('items__product')


class OrderDetailView(generics.RetrieveAPIView):
    """GET /api/orders/<order_number>/"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'order_number'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CancelOrderView(APIView):
    """POST /api/orders/<order_number>/cancel/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number, user=request.user)
        if order.status not in [Order.Status.PENDING, Order.Status.CONFIRMED]:
            return Response({'error': 'Order cannot be cancelled at this stage.'},
                            status=status.HTTP_400_BAD_REQUEST)
        order.status = Order.Status.CANCELLED
        order.save(update_fields=['status'])
        return Response({'message': 'Order cancelled successfully.'})
