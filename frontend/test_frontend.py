#!/usr/bin/env python
"""Test frontend-backend connection"""
import requests
import time
import subprocess
import sys
import os

def test_backend_connection():
    """Test if backend is running"""
    try:
        response = requests.get("http://127.0.0.1:8000/api/docs/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running at http://127.0.0.1:8000")
            return True
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running at http://127.0.0.1:8000")
        print("💡 Please start the backend first: python manage.py runserver")
        return False
    except Exception as e:
        print(f"❌ Error connecting to backend: {e}")
        return False

def test_frontend_connection():
    """Test if frontend is running"""
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running at http://localhost:3000")
            return True
        else:
            print(f"❌ Frontend returned status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Frontend is not running at http://localhost:3000")
        print("💡 Please start the frontend: npm run dev")
        return False
    except Exception as e:
        print(f"❌ Error connecting to frontend: {e}")
        return False

def test_api_endpoints():
    """Test key API endpoints"""
    endpoints = [
        "/api/auth/",
        "/api/products/",
        "/api/orders/",
    ]
    
    print("\n🔍 Testing API endpoints:")
    for endpoint in endpoints:
        try:
            response = requests.get(f"http://127.0.0.1:8000{endpoint}", timeout=5)
            status = "✅" if response.status_code in [200, 401, 403, 405] else "❌"
            print(f"{status} {endpoint} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {endpoint} - Error: {e}")

def main():
    print("🔗 Testing Annapurna Platform Connection")
    print("=" * 50)
    
    # Test backend
    backend_ok = test_backend_connection()
    
    if backend_ok:
        test_api_endpoints()
    
    print("\n" + "=" * 50)
    
    # Test frontend
    frontend_ok = test_frontend_connection()
    
    print("\n📋 Summary:")
    print(f"Backend: {'✅ Running' if backend_ok else '❌ Not Running'}")
    print(f"Frontend: {'✅ Running' if frontend_ok else '❌ Not Running'}")
    
    if backend_ok and frontend_ok:
        print("\n🎉 Both servers are running! You can access:")
        print("🌐 Frontend: http://localhost:3000")
        print("🔧 Backend API: http://127.0.0.1:8000/api/docs/")
        print("⚙️  Admin Panel: http://127.0.0.1:8000/admin/")
    else:
        print("\n💡 Next steps:")
        if not backend_ok:
            print("1. Start backend: cd backend && python manage.py runserver")
        if not frontend_ok:
            print("2. Start frontend: cd frontend && npm run dev")

if __name__ == "__main__":
    main()
