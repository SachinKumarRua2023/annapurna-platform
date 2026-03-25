#!/usr/bin/env python
"""Test auth endpoints specifically"""
import os
import sys
import django
import requests

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'annapurna.settings')
django.setup()

def test_auth_endpoints():
    base_url = "http://127.0.0.1:8000"
    
    print("🔍 Testing Auth Endpoints:")
    
    # Test main auth endpoint
    try:
        response = requests.get(f"{base_url}/api/auth/", timeout=5)
        print(f"✅ GET /api/auth/ - Status: {response.status_code}")
        if response.status_code == 405:
            print("   (Method Not Allowed is expected for GET)")
    except Exception as e:
        print(f"❌ GET /api/auth/ - Error: {e}")
    
    # Test login endpoint
    try:
        response = requests.post(f"{base_url}/api/auth/login/", 
                              json={"email": "admin@example.com", "password": "admin"}, 
                              timeout=5)
        print(f"✅ POST /api/auth/login/ - Status: {response.status_code}")
        if response.status_code == 200:
            print(f"   Login successful: {response.json().get('user', {}).get('email', 'N/A')}")
        else:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ POST /api/auth/login/ - Error: {e}")
    
    # Test register endpoint
    try:
        response = requests.post(f"{base_url}/api/auth/register/", 
                              json={
                                  "email": "test@example.com", 
                                  "full_name": "Test User", 
                                  "password": "testpass123",
                                  "password2": "testpass123"
                              }, 
                              timeout=5)
        print(f"✅ POST /api/auth/register/ - Status: {response.status_code}")
        if response.status_code == 201:
            print("   Registration successful")
        else:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ POST /api/auth/register/ - Error: {e}")

if __name__ == "__main__":
    test_auth_endpoints()
