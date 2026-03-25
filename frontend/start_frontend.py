#!/usr/bin/env python
"""Start frontend server"""
import subprocess
import sys
import os

def create_env_file():
    """Create .env.local file if it doesn't exist"""
    env_path = ".env.local"
    if not os.path.exists(env_path):
        print("📝 Creating .env.local file...")
        with open(env_path, 'w') as f:
            f.write("""# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Supabase Configuration (for future use)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
""")
        print("✅ .env.local created")
    else:
        print("✅ .env.local already exists")

def start_frontend():
    """Start the Next.js development server"""
    try:
        print("🚀 Starting Next.js development server...")
        print("🌐 Frontend will be available at: http://localhost:3000")
        print("🔄 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Start npm run dev
        subprocess.run([sys.executable, "-m", "subprocess", "run", "npm", ["run", "dev"]], 
                      check=False, shell=False)
        
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except Exception as e:
        print(f"❌ Error starting frontend: {e}")

if __name__ == "__main__":
    create_env_file()
    start_frontend()
