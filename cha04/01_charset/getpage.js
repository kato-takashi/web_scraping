//モジュールの取り込み
var client = require('cheerio-httpcli');
//文字コード
var Iconv = require('iconv').Iconv;
// var iconv = require('iconv-lite');
var jschardet = require('jschardet');

//ダウンロード
var url1 = "http://news.yahoo.co.jp/pickup/6193999";
var param = {
};

client.fetch(url1, param, function(err, $, res){
  //エラーがないかチェック
  if(err){
    console.log("Error:", err);
    return;
  }
  var body = $.html();

  // var body = $("html").text();
  // console.log(body);
  //文字コードの判定
  var det = jschardet.detect(body);
  console.log(det.encoding);
  //IconvでUTF8に変換するオブジェクトを作る
  var iconv = new Iconv(det.encoding, "utf-8");
  var printTxt = iconv.convert(body);//UTF-8に変換
  // console.log(print);
});
