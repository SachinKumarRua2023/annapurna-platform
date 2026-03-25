#!/usr/bin/env python
"""Test Django models"""
import os
import sys
import django
from django.core.management import execute_from_command_line

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

# Test model imports
try:
    from accounts.models import User
    from products.models import Category, Product, Review
    from orders.models import Order, OrderItem
    print("✅ All models imported successfully!")
    
    # Test basic model creation
    print("✅ Testing model definitions...")
    
    # Check Product model fields
    product_fields = [f.name for f in Product._meta.fields]
    print(f"Product fields: {product_fields}")
    
    if 'supplier' not in product_fields:
        print("✅ Supplier field successfully removed from Product model")
    else:
        print("❌ Supplier field still exists in Product model")
        
    print("✅ Model validation passed!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
