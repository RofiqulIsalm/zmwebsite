@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
chcp 65001 >nul
title ZM Printing - Localhost Server (Development)

echo.
echo ===================================================================
echo      ZM PRINTING ^& EMBROIDERY - LOCAL DEVELOPMENT SERVER
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
for /f "tokens=*" %%v in ('npm -v') do set NPM_VER=%%v
echo [+] Node.js detected: !NODE_VER!
echo [+] NPM detected:     v!NPM_VER!
echo.

:: 2. Check if node_modules folder exists
if not exist "%~dp0node_modules\" (
    echo [*] 'node_modules' folder not found. First-time setup starting...
    echo [*] Installing required packages [npm install]...
    echo [*] Please wait a moment, this may take 1-2 minutes...
    echo.
    call npm.cmd install
    if !errorlevel! neq 0 (
        echo.
        echo [ERROR] 'npm install' failed! Please check your internet connection.
        echo [ভুল] প্যাকেজ ইনস্টলেশন ব্যর্থ হয়েছে! ইন্টারনেট চেক করে আবার চেষ্টা করুন।
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [+] All packages installed successfully!
    echo.
) else (
    echo [+] Packages already installed.
    echo.
)

:: 3. Start local server and auto-open browser
echo ===================================================================
echo [*] Starting Localhost Server...
echo [*] Website will open automatically at: http://localhost:5173
echo [*] To stop the server, press Ctrl+C in this window.
echo ===================================================================
echo.

call npm.cmd run dev -- --open

if !errorlevel! neq 0 (
    echo.
    echo [ERROR] Localhost server stopped with an error.
    echo.
    pause
)
