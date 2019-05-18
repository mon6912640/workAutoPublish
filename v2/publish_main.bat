@echo off
cd ./
set VER_STR=v_common
set PJ_DIR=%cd%
cd ../
set JS_DIR=%PJ_DIR%\bin-release\web\ver
set RELEASE_DIR=%cd%\release
set CRC_TOOL=%cd%\tools\EgretCrcTool\EgretCrcTool.exe
cd %PJ_DIR%
%CRC_TOOL% --source %PJ_DIR%/resource --output %PJ_DIR%/resource_Publish
set RESOURCE_DIR=%PJ_DIR%\resource_Publish
xcopy %RESOURCE_DIR%\default.res.json %RELEASE_DIR%\%VER_STR%\ /s/y/i
xcopy %RESOURCE_DIR%\default.res.json %RELEASE_DIR%\resource\%VER_STR%\ /s/y/i
xcopy %JS_DIR%\manifest.json %RELEASE_DIR%\%VER_STR%\ /s/y/i
xcopy %JS_DIR%\js\*.* %RELEASE_DIR%\js\ /s/d/i
xcopy %RESOURCE_DIR%\assets\*.* %RELEASE_DIR%\resource\assets\ /s/d/i
cd %PJ_DIR%
pause