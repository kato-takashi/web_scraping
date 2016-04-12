//ファイルの読み書き
var fs = require('fs');

//UTF-8のファイルを読み込む
var txt = fs.readFileSync("sample-utf8.txt", "utf-8");
console.log(txt);

//ファイルをUTF8で書き込む
fs.writeFileSync("test.txt", txt);
