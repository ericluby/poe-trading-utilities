console.log('01 js start');
// https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
const spawn = require('child_process').spawn;

// 01 js start
// 02 js spawn w args ['"a b"', 'c d\ne']
// 03 js write to ahk stdin 'f g\nh i'
// 04 ahk start
// 05 ahk args 1(a b) 2(c) 3(d) 4()
// 06 ahk ReadLine from stdin "f g"
// 07 ahk Write to stdout "j k`nl m"
// 08 js read from ahk stdout 'j k\nl m'
// 09 ahk WriteLine to stderr "n o`np q"
// 10 js read from ahk stderr 'n o\np q'
// 11 ahk exit (code 2)
// 12 js detect ahk exit code(2)

const ahkExePath = '"B:\\program files\\auto hotkey\\AutoHotkey.exe"'; // order of single/double quotes matters
const ahkScriptPath = 'nodeAhkExample.ahk'; // if absolute path, escape like ahkExePath
const args = ['"a b"', 'c d\ne']; // %1%=a b %2%=c %3%=d`ne
const shell = spawn(ahkExePath, [ahkScriptPath, ...args], { shell: true });
console.log(`02 js spawn w args(${args})`)

shell.stdout.on('data', (data) => {
  console.log(`08 js read from ahk stdout(${data.toString()})`);
});

shell.stderr.on('data', (data) => {
  console.log(`10 js read from ahk stderr(${data.toString()})`);
});

shell.on('exit', (code) => {
  console.log(`12 js detect ahk exit code(${code})`); // Note: exit code 0 means no errors
  process.exit();
});

const message = 'f g\nh i';
console.log(`03 js write to ahk stdin(${message})`);
shell.stdin.write(message);
