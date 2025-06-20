# Paket UZB loyihasini ishga tushirish script
Write-Host "=== Paket UZB Loyihasini Ishga Tushirish ===" -ForegroundColor Green
Write-Host ""

# Backend serverni ishga tushirish
Write-Host "Backend serverni ishga tushirmoqda..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd 'C:\Users\Yoqubjon\Desktop\paket-uzb\backend'; npm start; Read-Host 'Press Enter to exit'" -WindowStyle Normal

# 3 soniya kutish
Start-Sleep -Seconds 3

# Frontend serverni ishga tushirish  
Write-Host "Frontend serverni ishga tushirmoqda..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd 'C:\Users\Yoqubjon\Desktop\paket-uzb\frontend'; npm start; Read-Host 'Press Enter to exit'" -WindowStyle Normal

Write-Host ""
Write-Host "=== Serverlar ishga tushirildi ===" -ForegroundColor Green
Write-Host "Backend: http://localhost:3004" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Loyihani to'xtatish uchun terminal oynalarini yoping." -ForegroundColor Yellow

# 5 soniya kutib brauzer ochish
Start-Sleep -Seconds 5
Write-Host "Brauzer ochilmoqda..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Read-Host "Press Enter to exit"
