# Paket UZB - Professional E-commerce Platform
Write-Host "🚀 Paket UZB - Professional E-commerce Platform" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

# Backend ishga tushirish
Write-Host "📦 Starting Backend Server..." -ForegroundColor Yellow
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Yoqubjon\Desktop\paket-uzb\backend'; npm start" -WindowStyle Normal

# 3 soniya kutish
Start-Sleep -Seconds 3

# Frontend ishga tushirish  
Write-Host "💻 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Yoqubjon\Desktop\paket-uzb\frontend'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "🌐 Servers are starting..." -ForegroundColor Green
Write-Host "   Backend:  http://localhost:3004" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Features:" -ForegroundColor Green
Write-Host "   ✅ Multi-language support (UZ/RU/EN)" -ForegroundColor White
Write-Host "   ✅ Real-time order notifications" -ForegroundColor White  
Write-Host "   ✅ Telegram bot integration" -ForegroundColor White
Write-Host "   ✅ Google Sheets integration" -ForegroundColor White
Write-Host "   ✅ Full e-commerce functionality" -ForegroundColor White
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Green
Write-Host "   - README.md - Complete project documentation" -ForegroundColor White
Write-Host "   - DEVELOPMENT.md - Development guidelines" -ForegroundColor White
Write-Host "   - DEPLOYMENT.md - Deployment instructions" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Both servers are now running in separate windows." -ForegroundColor Green
Write-Host "💡 Close the terminal windows to stop the servers." -ForegroundColor Yellow

# Browser ochish
Start-Sleep -Seconds 5
Write-Host "🌐 Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "✨ Paket UZB is ready for business!" -ForegroundColor Green
Write-Host "🎯 Real orders will be sent to Telegram and Google Sheets" -ForegroundColor Yellow
