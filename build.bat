@echo off
echo Building Exoplanetary AI Explorer for production...
echo.
echo Installing dependencies...
call npm install
echo.
echo Building project...
call npm run build
echo.
echo Build complete! Check the 'dist' folder for production files.
pause
