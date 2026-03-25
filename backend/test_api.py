#!/usr/bin/env python
"""Test API endpoints"""
import requests
import json

def test_api_endpoints():
    base_url = "http://127.0.0.1:8000"
    
    print("🔍 Testing Django Backend API Endpoints...")
    
    endpoints = [
        "/api/docs/",
        "/api/schema/",
        "/admin/",
        "/api/auth/",
        "/api/products/",
        "/api/orders/",
    ]
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}", timeout=5)
            status = "✅" if response.status_code in [200, 401, 403, 405] else "❌"
            print(f"{status} {endpoint} - Status: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"❌ {endpoint} - Connection failed (server not running?)")
        except Exception as e:
            print(f"❌ {endpoint} - Error: {e}")
    
    print("\n🎯 API Documentation available at: http://127.0.0.1:8000/api/docs/")
    print("🔧 Django Admin at: http://127.0.0.1:8000/admin/")

if __name__ == "__main__":
    test_api_endpoints()
