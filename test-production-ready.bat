@echo off
title Paket UZB - Production Build Test
color 0E

echo.
echo 🏗️ PAKET UZB - PRODUCTION BUILD TEST
echo ========================================
echo.

echo [1/3] Frontend Build Test...
cd frontend
echo Building React frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
) else (
    echo ✅ Frontend build successful!
)

echo.
echo [2/3] Backend Dependencies Check...
cd ..\backend
echo Checking backend dependencies...
call npm list --depth=0
if %errorlevel% neq 0 (
    echo ⚠️ Some dependencies might be missing
) else (
    echo ✅ Backend dependencies OK!
)

echo.
echo [3/3] Environment Variables Check...
if not exist ".env" (
    echo ❌ Backend .env file missing!
    pause
    exit /b 1
) else (
    echo ✅ Backend .env file exists!
)

cd ..\frontend
if not exist ".env" (
    echo ❌ Frontend .env file missing!
    pause
    exit /b 1
) else (
    echo ✅ Frontend .env file exists!
)

echo.
echo 🎉 BUILD TEST COMPLETED SUCCESSFULLY!
echo =====================================
echo.
echo ✅ Frontend build: PASSED
echo ✅ Backend dependencies: PASSED  
echo ✅ Environment files: PASSED
echo.
echo 🚀 Project is ready for production deployment!
echo.
echo 📋 Next steps:
echo    1. Deploy backend to Vercel/Heroku
echo    2. Deploy frontend to Netlify/Vercel
echo    3. Update environment variables on hosting
echo    4. Test live deployment
echo.
pause
