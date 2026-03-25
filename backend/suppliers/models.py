"""suppliers/models.py"""
from django.db import models
from django.conf import settings
import uuid


class Supplier(models.Model):
    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user         = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                        related_name='supplier_profile', null=True, blank=True)
    name         = models.CharField(max_length=300)
    email        = models.EmailField()
    phone        = models.CharField(max_length=20)
    address      = models.TextField()
    gst_number   = models.CharField(max_length=20, blank=True)
    is_active    = models.BooleanField(default=True)
    rating       = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
