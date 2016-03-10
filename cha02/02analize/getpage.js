//モジュールの取り込み
var client = require('cheerio-httpcli');

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
  // var body = $.html();
  var body = $("html").text();
  console.log(body);
});
