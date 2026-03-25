"""products/models.py"""

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Category(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name        = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image       = models.ImageField(upload_to='categories/', null=True, blank=True)
    parent      = models.ForeignKey('self', on_delete=models.SET_NULL,
                                    null=True, blank=True, related_name='children')
    is_active   = models.BooleanField(default=True)
    sort_order  = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class Product(models.Model):
    class Status(models.TextChoices):
        DRAFT     = 'draft',     'Draft'
        ACTIVE    = 'active',    'Active'
        INACTIVE  = 'inactive',  'Inactive'
        OUT_STOCK = 'out_stock', 'Out of Stock'

    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category      = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                      null=True, related_name='products')
    # supplier field will be added when suppliers app is ready
    # supplier      = models.ForeignKey('suppliers.Supplier', on_delete=models.SET_NULL,
    #                                   null=True, blank=True, related_name='products')

    name          = models.CharField(max_length=300)
    slug          = models.SlugField(unique=True, max_length=350)
    description   = models.TextField()
    short_desc    = models.CharField(max_length=500, blank=True)

    sku           = models.CharField(max_length=100, unique=True)
    barcode       = models.CharField(max_length=100, blank=True)

    price         = models.DecimalField(max_digits=10, decimal_places=2)
    compare_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cost_price    = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    stock         = models.PositiveIntegerField(default=0)
    low_stock_threshold = models.PositiveIntegerField(default=10)
    track_inventory = models.BooleanField(default=True)

    weight        = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True,
                                        help_text='Weight in grams')
    unit          = models.CharField(max_length=50, default='piece',
                                     help_text='e.g. kg, litre, piece, dozen')

    status        = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    is_featured   = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)

    tags          = models.JSONField(default=list, blank=True)
    meta_title    = models.CharField(max_length=200, blank=True)
    meta_desc     = models.CharField(max_length=300, blank=True)

    created_by    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
                                      null=True, related_name='created_products')
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def is_in_stock(self):
        return self.stock > 0

    @property
    def discount_percent(self):
        if self.compare_price and self.compare_price > self.price:
            return round((1 - self.price / self.compare_price) * 100)
        return 0

    @property
    def avg_rating(self):
        reviews = self.reviews.filter(is_approved=True)
        if reviews.exists():
            return round(reviews.aggregate(
                models.Avg('rating'))['rating__avg'], 1)
        return 0


class ProductImage(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image      = models.ImageField(upload_to='products/')
    alt_text   = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order']

    def save(self, *args, **kwargs):
        if self.is_primary:
            ProductImage.objects.filter(
                product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)


class Review(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product     = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                    related_name='reviews')
    rating      = models.PositiveSmallIntegerField(
                    validators=[MinValueValidator(1), MaxValueValidator(5)])
    title       = models.CharField(max_length=200, blank=True)
    body        = models.TextField()
    is_approved = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False, help_text='Verified purchase')
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['product', 'user']
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.full_name} - {self.product.name} ({self.rating}★)'


class Wishlist(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                   related_name='wishlist')
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlisted_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'product']
