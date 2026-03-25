"""orders/models.py"""

from django.db import models
from django.conf import settings
import uuid


class Cart(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                      related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())

    @property
    def item_count(self):
        return self.items.aggregate(models.Sum('quantity'))['quantity__sum'] or 0


class CartItem(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart       = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product    = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity   = models.PositiveIntegerField(default=1)
    added_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['cart', 'product']

    @property
    def subtotal(self):
        return self.product.price * self.quantity


class Coupon(models.Model):
    class Type(models.TextChoices):
        PERCENT = 'percent', 'Percentage'
        FIXED   = 'fixed',   'Fixed Amount'

    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code         = models.CharField(max_length=50, unique=True)
    type         = models.CharField(max_length=10, choices=Type.choices, default=Type.PERCENT)
    value        = models.DecimalField(max_digits=10, decimal_places=2)
    min_order    = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_discount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    usage_limit  = models.PositiveIntegerField(null=True, blank=True)
    used_count   = models.PositiveIntegerField(default=0)
    is_active    = models.BooleanField(default=True)
    valid_from   = models.DateTimeField()
    valid_to     = models.DateTimeField()
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

    def calculate_discount(self, amount):
        if self.type == self.Type.PERCENT:
            discount = amount * self.value / 100
            if self.max_discount:
                discount = min(discount, self.max_discount)
        else:
            discount = self.value
        return min(discount, amount)


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING    = 'pending',    'Pending'
        CONFIRMED  = 'confirmed',  'Confirmed'
        PROCESSING = 'processing', 'Processing'
        SHIPPED    = 'shipped',    'Shipped'
        DELIVERED  = 'delivered',  'Delivered'
        CANCELLED  = 'cancelled',  'Cancelled'
        REFUNDED   = 'refunded',   'Refunded'

    class PaymentStatus(models.TextChoices):
        PENDING = 'pending', 'Pending'
        PAID    = 'paid',    'Paid'
        FAILED  = 'failed',  'Failed'
        REFUND  = 'refunded','Refunded'

    class PaymentMethod(models.TextChoices):
        COD    = 'cod',    'Cash on Delivery'
        ONLINE = 'online', 'Online Payment'
        UPI    = 'upi',    'UPI'

    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number    = models.CharField(max_length=50, unique=True)
    user            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
                                        related_name='orders')

    # Address snapshot (so address changes don't affect old orders)
    shipping_name   = models.CharField(max_length=255)
    shipping_phone  = models.CharField(max_length=20)
    shipping_line1  = models.CharField(max_length=255)
    shipping_line2  = models.CharField(max_length=255, blank=True)
    shipping_city   = models.CharField(max_length=100)
    shipping_state  = models.CharField(max_length=100)
    shipping_pincode= models.CharField(max_length=10)
    shipping_country= models.CharField(max_length=100, default='India')

    coupon          = models.ForeignKey(Coupon, on_delete=models.SET_NULL,
                                        null=True, blank=True)
    subtotal        = models.DecimalField(max_digits=12, decimal_places=2)
    discount        = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    shipping_charge = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total           = models.DecimalField(max_digits=12, decimal_places=2)

    status          = models.CharField(max_length=20, choices=Status.choices,
                                       default=Status.PENDING)
    payment_status  = models.CharField(max_length=20, choices=PaymentStatus.choices,
                                       default=PaymentStatus.PENDING)
    payment_method  = models.CharField(max_length=20, choices=PaymentMethod.choices,
                                       default=PaymentMethod.COD)
    payment_id      = models.CharField(max_length=200, blank=True)

    notes           = models.TextField(blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.order_number

    def save(self, *args, **kwargs):
        if not self.order_number:
            import random, string
            self.order_number = 'ANN-' + ''.join(
                random.choices(string.digits, k=8))
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order         = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product       = models.ForeignKey('products.Product', on_delete=models.PROTECT)
    product_name  = models.CharField(max_length=300)  # snapshot
    product_sku   = models.CharField(max_length=100)   # snapshot
    unit_price    = models.DecimalField(max_digits=10, decimal_places=2)
    quantity      = models.PositiveIntegerField()
    total         = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        self.total = self.unit_price * self.quantity
        super().save(*args, **kwargs)
