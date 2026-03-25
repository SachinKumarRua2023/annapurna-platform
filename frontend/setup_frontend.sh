#!/bin/bash
# Frontend Setup Script for Annapurna Platform

echo "🚀 Setting up Annapurna Frontend..."

# Create environment file
echo "📝 Creating environment file..."
cat > .env.local << EOL
# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Supabase Configuration (for future use)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EOL

echo "✅ Environment file created"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "🎉 Frontend setup complete!"
echo ""
echo "🔧 Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run start   - Start production server"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔗 Backend should be running at: http://127.0.0.1:8000"
