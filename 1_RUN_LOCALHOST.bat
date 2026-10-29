@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul

if exist "%~dp0zmwebsite-main\1_RUN_LOCALHOST.bat" (
    cd /d "%~dp0zmwebsite-main"
    call "1_RUN_LOCALHOST.bat" %*
) else (
    cd /d "%~dp0"
    call npm run dev -- --open
)
