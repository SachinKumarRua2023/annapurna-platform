#!/usr/bin/env python
"""Migrate and create superuser"""
import os
import sys
import django
from django.core.management import execute_from_command_line

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

print("🔄 Running migrations...")
execute_from_command_line(['manage.py', 'migrate'])

print("🔄 Creating superuser...")
try:
    from accounts.models import User
    if not User.objects.filter(email='admin@example.com').exists():
        User.objects.create_superuser(
            email='admin@example.com',
            password='admin',
            full_name='Admin User'
        )
        print("✅ Superuser created: admin@example.com / admin")
    else:
        print("ℹ️ Superuser already exists")
except Exception as e:
    print(f"❌ Error creating superuser: {e}")

print("🎉 Setup complete!")
