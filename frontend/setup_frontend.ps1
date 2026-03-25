# Frontend Setup Script for Annapurna Platform (PowerShell)

Write-Host "🚀 Setting up Annapurna Frontend..." -ForegroundColor Green

# Create environment file
Write-Host "📝 Creating environment file..." -ForegroundColor Yellow
$envContent = @"
# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Supabase Configuration (for future use)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
"@

Set-Content -Path ".env.local" -Value $envContent -Force
Write-Host "✅ Environment file created" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🎉 Frontend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev     - Start development server" -ForegroundColor White
Write-Host "  npm run build   - Build for production" -ForegroundColor White
Write-Host "  npm run start   - Start production server" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔗 Backend should be running at: http://127.0.0.1:8000" -ForegroundColor Cyan
