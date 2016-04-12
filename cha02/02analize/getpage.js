//モジュールの取り込み
var client = require('cheerio-httpcli');
//文字コード
var iconv = require('iconv').Iconv;
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
  console.log(det);
  var iconv2 = new iconv(det.encoding, "utf-16");
  var output = iconv2.convert(body);
  console.log("text "+output);
});
