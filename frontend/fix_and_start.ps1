# Fix execution policy and start frontend

# Set execution policy for current process
Write-Host "🔧 Setting execution policy..." -ForegroundColor Yellow
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Create env file if needed
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Green
    @"
# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Supabase Configuration (for future use)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ .env.local created" -ForegroundColor Green
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "🚀 Starting Next.js development server..." -ForegroundColor Green
Write-Host "🌐 Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔄 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Gray

# Start the development server
npm run dev
