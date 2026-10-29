@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
chcp 65001 >nul
title ZM Printing - Production Build & Check (dist)

echo.
echo ===================================================================
echo     ZM PRINTING ^& EMBROIDERY - PRODUCTION CHECK ^& BUILD
echo ===================================================================
echo.

:: 1. Check Node.js and NPM installation
echo [*] Checking Node.js installation...
where node >nul 2>nul
if !errorlevel! neq 0 (
    echo.
    echo [ERROR] Node.js is NOT installed on this computer!
    echo [ভুল] এই কম্পিউটারে Node.js ইনস্টল করা নেই!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [+] Node.js detected: !NODE_VER!
echo.

:: 2. Check if node_modules exists
if not exist "%~dp0node_modules\" (
    echo [*] 'node_modules' folder not found. Installing dependencies...
    echo [*] Installing required packages [npm install]...
    echo.
    call npm.cmd install
    if !errorlevel! neq 0 (
        echo.
        echo [ERROR] Package installation failed!
        pause
        exit /b 1
    )
    echo [+] Dependencies installed successfully.
    echo.
) else (
    echo [+] Dependencies verified.
    echo.
)

:: 3. Run lint & error checking
echo ===================================================================
echo [*] Checking for code errors ^& linting (Code verification)...
echo ===================================================================
echo.
call npm.cmd run lint
if !errorlevel! neq 0 (
    echo.
    echo [WARNING] Lint found issues, checking if build can still succeed...
) else (
    echo.
    echo [+] Code quality check passed! No syntax errors found.
)
echo.

:: 4. Build production files (dist)
echo ===================================================================
echo [*] Building production bundle for Live Hosting (dist)...
echo ===================================================================
echo.

call npm.cmd run build
if !errorlevel! neq 0 (
    echo.
    echo ===================================================================
    echo [FAILED] Production build failed! Please check the error above.
    echo [ব্যর্থ] প্রোডাকশন বিল্ড ব্যর্থ হয়েছে! উপরের এররটি দেখুন।
    echo ===================================================================
    echo.
    pause
    exit /b 1
)

echo.
echo ===================================================================
echo [SUCCESS] PRODUCTION BUILD COMPLETED SUCCESSFULLY!
echo [সফল] আপনার লাইভ ওয়েবসাইট ফাইলগুলো 'dist' ফোল্ডারে প্রস্তুত!
echo ===================================================================
echo.
echo [+] Output Folder: "%~dp0dist"
echo.
echo ===================================================================
echo Live Deployment Instructions / লাইভ করার নিয়ম:
echo 1. cPanel / Shared Hosting: 'dist' ফোল্ডারের ভিতরের সব ফাইল 
echo    আপনার সার্ভারের 'public_html' ফোল্ডারে আপলোড করুন।
echo 2. Vercel / Netlify / Cloudflare: সরাসরি এই প্রোজেক্ট ফোল্ডার 
echo    ইম্পোর্ট বা গিটহাবে পুশ করলেই স্বয়ংক্রিয়ভাবে লাইভ হয়ে যাবে।
echo ===================================================================
echo.

:: 5. Open dist folder in Windows File Explorer
echo [*] Opening 'dist' folder in File Explorer...
start "" "%~dp0dist"

echo.
echo Would you like to preview the production site in your browser right now?
set /p run_preview="Enter choice (Y/N, default N): "
if /i "!run_preview!"=="Y" (
    echo.
    echo [*] Starting preview server... (Press Ctrl+C to stop)
    call npm.cmd run preview -- --open
)

echo.
echo Done. Press any key to exit.
pause >nul
