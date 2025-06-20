@echo off
title Paket UZB - Professional E-commerce Platform

echo.
echo 🚀 Paket UZB - Professional E-commerce Platform
echo ==============================================
echo.

echo 📦 Starting Backend Server...
start "Backend Server" cmd /k "cd /d c:\Users\Yoqubjon\Desktop\paket-uzb\backend && npm start"

timeout /t 3 /nobreak > nul

echo 💻 Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d c:\Users\Yoqubjon\Desktop\paket-uzb\frontend && npm start"

echo.
echo 🌐 Servers are starting...
echo    Backend:  http://localhost:3004
echo    Frontend: http://localhost:3000
echo.
echo 📊 Features:
echo    ✅ Multi-language support (UZ/RU/EN)
echo    ✅ Real-time order notifications
echo    ✅ Telegram bot integration
echo    ✅ Google Sheets integration
echo    ✅ Full e-commerce functionality
echo.
echo 📖 Documentation:
echo    - README.md - Complete project documentation
echo    - DEVELOPMENT.md - Development guidelines
echo    - DEPLOYMENT.md - Deployment instructions
echo.
echo 🛑 Both servers are now running in separate windows.
echo 💡 Close the terminal windows to stop the servers.
echo.

timeout /t 5 /nobreak > nul
echo 🌐 Opening browser...
start http://localhost:3000

echo.
echo ✨ Paket UZB is ready for business!
echo 🎯 Real orders will be sent to Telegram and Google Sheets
echo.
pause
