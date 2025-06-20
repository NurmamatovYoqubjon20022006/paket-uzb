@echo off
title Paket UZB - Startup Script
color 0A

echo ===============================================
echo    PAKET UZB - LOYIHA ISHGA TUSHIRISH
echo ===============================================
echo.

echo [1/4] Node.js versiyasini tekshirish...
node --version
if %errorlevel% neq 0 (
    echo XATO: Node.js o'rnatilmagan!
    echo Iltimos Node.js ni o'rnating: https://nodejs.org
    pause
    exit /b 1
)

echo [2/4] NPM versiyasini tekshirish...
npm --version
if %errorlevel% neq 0 (
    echo XATO: NPM topilmadi!
    pause
    exit /b 1
)

echo [3/4] Backend dependencies o'rnatish...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo XATO: Backend dependencies o'rnatishda xatolik!
    pause
    exit /b 1
)

echo [4/4] Frontend dependencies o'rnatish...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo XATO: Frontend dependencies o'rnatishda xatolik!
    pause
    exit /b 1
)

echo.
echo ===============================================
echo    DEPENDENCIES MUVAFFAQIYATLI O'RNATILDI!
echo ===============================================
echo.

echo Backend serverni ishga tushirish...
cd ..\backend
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Frontend ilovasini ishga tushirish...
cd ..\frontend
start "Frontend App" cmd /k "npm start"

echo.
echo ===============================================
echo    SERVERLAR ISHGA TUSHIRILDI!
echo ===============================================
echo    Backend:  http://localhost:3004
echo    Frontend: http://localhost:3000
echo ===============================================
echo.

echo Serverlarni to'xtatish uchun har ikkala oynani yoping.
pause
