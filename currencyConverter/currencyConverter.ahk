SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

f4:: ; hotkey to start program
InputBox, input, Enter exalt remainder,
Run, cmd /k node currencyConverter.js %input%, %A_ScriptDir%, Hide
  ;shell := ComObjCreate("WScript.Shell")
  ;exec := shell.Exec(ComSpec " /C node currencyConverter.js " input)
  ;output := exec.StdOut.ReadAll()
Return
