//csvファイルを読み込む

var CSV = require('comma-separated-values');
var fs = require('fs');
var Iconv = require('iconv').Iconv

//shift_jisをUTF-8に変換するオブジェクトを生成;
var iconv = new Iconv('SHIFT_JIS', 'UTF-8');
//shift_jisに変換
var buf = fs.readFileSync('test.csv');
var txt = iconv.convert(buf).toString('utf-8');
//CSVファイルをパースする
var csv = new CSV(txt, {header:false});
var records = csv.parse();

//一行目はヘッダなので、捨てる
records.shift();

//結果を出力
for(var i=0; i < records.length; i++){
  var fs = records[i];
  var name = fs[0];
  var price = fs[1];
  var memo = fs[2];
  console.log(name, price, memo);
}
