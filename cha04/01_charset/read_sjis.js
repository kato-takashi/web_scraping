//Shift jisを読んでUTF-8で保存する
var fs = require('fs');
var Iconv = require('iconv').Iconv;

//Shift_JISからUTF8へ変換するオブジェクト
var sjis_utf8 = new Iconv('SHIFT_JIS', 'utf-8');

//Shift_JISファイルを読み込む
var buf = fs.readFileSync('sample-sjis.txt');

var buf2 = sjis_utf8.convert(buf); //Shift_JISをUTF-8に変換
var txt = buf2.toString('utf-8');

console.log(txt);

//UTF8のファイルへ保存
fs.writeFileSync('test.txt', txt, 'utf-8');
