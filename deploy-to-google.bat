@echo off
title Paket UZB - Google Cloud Deployment
color 0A

echo.
echo 🚀 PAKET UZB - GOOGLE CLOUD DEPLOYMENT
echo =====================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️ Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI installed successfully
) else (
    echo ✅ Vercel CLI is already installed
)

echo.
echo 📦 BUILDING FRONTEND...
echo =======================
cd frontend

echo Installing frontend dependencies...
call npm ci
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo Building React application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
) else (
    echo ✅ Frontend built successfully!
)

cd ..

echo.
echo 🔧 TESTING BACKEND...
echo ====================
cd backend

echo Installing backend dependencies...
call npm ci
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Check if .env exists, if not copy from .env.production
if not exist ".env" (
    echo ⚠️ .env file not found. Using .env.production
    copy .env.production .env
)

echo ✅ Backend dependencies installed!
cd ..

echo.
echo 🌍 DEPLOYING TO VERCEL...
echo =========================

echo Deploying backend...
cd backend
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo ❌ Backend deployment failed!
    pause
    exit /b 1
) else (
    echo ✅ Backend deployed successfully!
)

cd ..

echo Deploying frontend...
cd frontend
call vercel --prod --yes
if %errorlevel% neq 0 (
    echo ❌ Frontend deployment failed!
    pause
    exit /b 1
) else (
    echo ✅ Frontend deployed successfully!
)

cd ..

echo.
echo 🧪 TESTING DEPLOYMENT...
echo =======================

echo Testing backend health...
timeout /t 5 /nobreak > nul
echo Backend should be accessible via Vercel URL

echo Opening browser to test...
timeout /t 2 /nobreak > nul

echo.
echo 🎉 DEPLOYMENT COMPLETED!
echo =======================
echo.
echo ✅ Frontend deployed to Vercel
echo ✅ Backend deployed to Vercel
echo.
echo 📋 Next Steps:
echo   1. Check your Vercel dashboard for URLs
echo   2. Update environment variables on Vercel
echo   3. Test all functionality on live site
echo   4. Configure custom domain (optional)
echo.
echo 🌐 Your URLs will be shown in Vercel dashboard:
echo   - https://vercel.com/dashboard
echo.
echo 📞 Support: Check Vercel deployment logs if issues occur
echo.

timeout /t 10 /nobreak > nul
start https://vercel.com/dashboard

echo.
echo ✨ Paket UZB is now live on Google Cloud infrastructure!
echo 🎯 Real orders will be sent to Telegram and Google Sheets
echo.
pause
