#!/usr/bin/env python
"""Reset database and run migrations"""
import os
import sys
import django
from django.core.management import execute_from_command_line
from django.conf import settings

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

# Remove existing database file
db_path = settings.DATABASES['default']['NAME']
if os.path.exists(db_path):
    os.remove(db_path)
    print(f"✅ Removed existing database: {db_path}")

# Run migrations
print("🔄 Running migrations...")
try:
    execute_from_command_line(['manage.py', 'migrate'])
    print("✅ Migrations completed successfully!")
except Exception as e:
    print(f"❌ Migration failed: {e}")
    sys.exit(1)

# Create superuser
print("🔄 Creating superuser...")
try:
    execute_from_command_line(['manage.py', 'createsuperuser', '--noinput', '--username', 'admin', '--email', 'admin@example.com'])
    print("✅ Superuser created: admin/admin")
except:
    print("ℹ️ Superuser may already exist")

print("🎉 Database setup complete!")
