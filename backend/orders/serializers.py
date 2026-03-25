"""orders/serializers.py"""
from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Coupon
from products.serializers import ProductListSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product  = ProductListSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'subtotal']


class CartSerializer(serializers.ModelSerializer):
    items      = CartItemSerializer(many=True, read_only=True)
    total      = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total', 'item_count', 'updated_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_sku',
                  'unit_price', 'quantity', 'total']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'order_number', 'items', 'shipping_name', 'shipping_phone',
                  'shipping_line1', 'shipping_line2', 'shipping_city', 'shipping_state',
                  'shipping_pincode', 'subtotal', 'discount', 'shipping_charge', 'total',
                  'status', 'payment_status', 'payment_method', 'notes', 'created_at']
        read_only_fields = ['id', 'order_number', 'subtotal', 'discount',
                            'shipping_charge', 'total', 'status', 'payment_status']


class CheckoutSerializer(serializers.Serializer):
    address_id     = serializers.UUIDField()
    payment_method = serializers.ChoiceField(choices=Order.PaymentMethod.choices)
    coupon_code    = serializers.CharField(required=False, allow_blank=True)
    notes          = serializers.CharField(required=False, allow_blank=True)
