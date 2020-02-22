; How to invoke from PowerShell:
; CMD /c '"B:\program files\auto hotkey\AutoHotkey.exe" nodeAhkExample.ahk foo "bar baz"'
; CMD /c '"B:\program files\auto hotkey\AutoHotkey.exe" "%userprofile%\Desktop\learning JS\poe-trading-utilities\tradeSMS\nodeAhkExample.ahk" "foo bar" "baz qux" quux quuux'

; 01 js start
; 02 js spawn w args ['"a b"', 'c d\ne']
; 03 js write to ahk stdin 'f g\nh i'
; 04 ahk start
; 05 ahk args 1(a b) 2(c) 3(d) 4()
; 06 ahk ReadLine from stdin "f g"
; 07 ahk Write to stdout "j k`nl m"
; 08 js read from ahk stdout 'j k\nl m'
; 09 ahk WriteLine to stderr "n o`np q"
; 10 js read from ahk stderr 'n o\np q'
; 11 ahk exit (code 2)
; 12 js detect ahk exit code(2)

MsgBox, "04 ahk start"
MsgBox, 05 ahk args 1(%1%) 2(%2%) 3(%3%) 4(%4%)

stdin  := FileOpen("*", "r `n") ; Open the application's stdin/stdout streams in newline-translated mode.
stdout := FileOpen("*", "w `n") ; Requires [v1.1.17+]
stderr := FileOpen("**", "w") ; https://www.autohotkey.com/docs/commands/FileOpen.htm#ExStreams

query := stdin.ReadLine() ; second arg is optional chars to exclude
MsgBox, 06 ahk ReadLine from stdin(%query%)

MsgBox, 07 ahk Write to stdout("j k`nl m")
stdout.Write("j k`nl m")
stdout.Read(0) ; flush the write buffer to actually send the message (otherwise won't send unless Return)

MsgBox, 09 ahk WriteLine to stderr("n o`np q")
stderr.WriteLine("n o`np q")
stderr.Read(0) ; flush the write buffer to actually send the message (otherwise won't send unless Return)

MsgBox, 11 ahk exit (code 2)
Exit 2
