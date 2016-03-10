//モジュールの取り込み
var client = require('cheerio-httpcli');
var URL = require("url");

var base = "http://kkujirahand.com/url/test/index.html";
var u1 = URL.resolve(base, 'a.html');
console.log("u1 = "+u1);

var u2 = URL.resolve(base, '../b.html');
console.log("u2 = "+u2);

var u3 = URL.resolve(base, 'c.html');
console.log("u3 = "+u3);
//
// //ダウンロード
// var url1 = "http://www.aozora.gr.jp/index_pages/person81.html";
// var param = {
// };
//
// client.fetch(url1, param, function(err, $, res){
//   //エラーがないかチェック
//   if(err){
//     console.log("Error:", err);
//     return;
//   }
//   //リンクを抽出して表示
//   $("a").each(function(idx){
//     var text = $(this).text();
//     var href = $(this).attr('href');
//     console.log(text + ": " + href);
//   });
// });
