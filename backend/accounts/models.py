"""accounts/models.py — Custom User model with roles"""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.ADMIN)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN     = 'admin',    'Admin'
        CUSTOMER  = 'customer', 'Customer'
        SUPPLIER  = 'supplier', 'Supplier'
        DELIVERY  = 'delivery', 'Delivery Agent'
        STAFF     = 'staff',    'Staff'

    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email         = models.EmailField(unique=True)
    full_name     = models.CharField(max_length=255)
    phone         = models.CharField(max_length=20, blank=True)
    role          = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)
    avatar        = models.ImageField(upload_to='avatars/', null=True, blank=True)

    # Supabase auth UID (for Google OAuth users)
    supabase_uid  = models.CharField(max_length=255, blank=True, null=True, unique=True)

    is_active     = models.BooleanField(default=True)
    is_staff      = models.BooleanField(default=False)
    is_verified   = models.BooleanField(default=False)
    date_joined   = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']

    def __str__(self):
        return f'{self.full_name} ({self.email})'

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN

    @property
    def is_customer(self):
        return self.role == self.Role.CUSTOMER

    @property
    def is_supplier(self):
        return self.role == self.Role.SUPPLIER


class Address(models.Model):
    class Type(models.TextChoices):
        HOME   = 'home',   'Home'
        WORK   = 'work',   'Work'
        OTHER  = 'other',  'Other'

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    type        = models.CharField(max_length=10, choices=Type.choices, default=Type.HOME)
    full_name   = models.CharField(max_length=255)
    phone       = models.CharField(max_length=20)
    line1       = models.CharField(max_length=255)
    line2       = models.CharField(max_length=255, blank=True)
    city        = models.CharField(max_length=100)
    state       = models.CharField(max_length=100)
    pincode     = models.CharField(max_length=10)
    country     = models.CharField(max_length=100, default='India')
    is_default  = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Addresses'

    def save(self, *args, **kwargs):
        if self.is_default:
            Address.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.full_name} - {self.city}, {self.state}'
