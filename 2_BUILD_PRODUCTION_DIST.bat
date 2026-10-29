@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul

if exist "%~dp0zmwebsite-main\2_BUILD_PRODUCTION_DIST.bat" (
    cd /d "%~dp0zmwebsite-main"
    call "2_BUILD_PRODUCTION_DIST.bat" %*
) else (
    cd /d "%~dp0"
    call npm run build
)
