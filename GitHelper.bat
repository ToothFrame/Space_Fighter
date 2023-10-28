@ECHO OFF
CLS
:Start
ECHO 1.Add changes
ECHO 2.Commit changes
ECHO 3.Push
ECHO 4.Quit
ECHO.

CHOICE /C 12345 /M "Enter your choice:"

:: Note - list ERRORLEVELS in decreasing order
IF ERRORLEVEL 4 GOTO Quit
IF ERRORLEVEL 3 GOTO Push
IF ERRORLEVEL 2 GOTO Commit
IF ERRORLEVEL 1 GOTO Add

:Add
ECHO Adding Changes 
(git add -A)
GOTO Start

:Commit
ECHO Committing
set /p CommitMessage=What is your commit message?
(git commit -m"%CommitMessage%")
GOTO Start

:Push
ECHO Pushing 
(git push)
GOTO Start

:Quit
(exit)

