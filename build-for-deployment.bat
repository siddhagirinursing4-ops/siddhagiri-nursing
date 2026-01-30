@echo off
echo ========================================
echo Building Frontend for DirectAdmin
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo ERROR: .env file not found!
    echo.
    echo Please create .env file with:
    echo VITE_API_URL=https://your-render-backend.onrender.com/api
    echo.
    pause
    exit /b 1
)

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Building production bundle...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your DirectAdmin File Manager
echo 2. Navigate to public_html folder
echo 3. Upload ALL files from the 'dist' folder
echo 4. Upload the .htaccess file to public_html root
echo 5. Visit your domain to test!
echo.
echo Files to upload are in: dist\
echo.
pause
