//モジュールの取り込み
var client = require('cheerio-httpcli');
var URL = require("url");

//ダウンロード
var url1 = "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%8C";
var param = {
};

client.fetch(url1, param, function(err, $, res){
  //エラーがないかチェック
  if(err){
    console.log("Error:", err);
    return;
  }
  //リンクを抽出して表示
  $("img").each(function(idx){
    var src = $(this).attr('src');
    src = URL.resolve(url1, src);
    console.log("=> " + src);
  });
});
