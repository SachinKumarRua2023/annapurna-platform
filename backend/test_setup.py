#!/usr/bin/env python
"""Test Django setup"""
import os
import sys
import django
from django.conf import settings
from django.core.management import execute_from_command_line

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

print("Django setup successful!")
print(f"Database: {settings.DATABASES['default']['ENGINE']}")
print(f"Installed apps: {settings.INSTALLED_APPS}")
