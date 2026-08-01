@echo off
REM Run the game locally (Windows). Builds bundle if Node is available, serves files via Python, and opens browser.
SETLOCAL
REM Change to project folder so paths with spaces work (user requested)
cd /d "C:\Users\wtsna\Desktop\Coin and Company\Coin and Company"
IF %ERRORLEVEL% NEQ 0 (
  echo Warning: failed to change to project directory. Continuing in current directory.
)

REM Optional: build with Node if available
where node >nul 2>&1
IF %ERRORLEVEL%==0 (
  echo Building bundle with Node...
  node scripts\build-bundle.js || (
    echo Build failed, continuing to serve existing bundle...
  )
) ELSE (
  echo Node not found; skipping build.
)

REM Try Python's http.server first
where python >nul 2>&1
IF %ERRORLEVEL%==0 (
  echo Starting Python HTTP server on port 8000 in a new window...
  start "Game Server" cmd /c "python -m http.server 8000"
  timeout /t 1 >nul
  start "" "http://localhost:8000"
  exit /b 0
)

REM Fallback: try npx http-server
where npx >nul 2>&1
IF %ERRORLEVEL%==0 (
  echo Starting http-server on port 8000 in a new window...
  start "Game Server" cmd /c "npx http-server -p 8000"
  timeout /t 1 >nul
  start "" "http://localhost:8000"
  exit /b 0
)

echo No suitable server (python or npx) found. Please install Python 3 or http-server (npm package) and re-run.
exit /b 1
