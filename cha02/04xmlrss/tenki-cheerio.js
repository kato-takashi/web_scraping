var RSS = "http://rss.weather.yahoo.co.jp/rss/days/4410.xml";

//モジュールを読む
var client = require('cheerio-httpcli');

//RSSをダウンロード
client.fetch(RSS, function(err, $, res){
  if(err){
    console.log("err");
    return;
  }
  $("item > title").each(function(idx){
    var title = $(this).text();
    console.log(title);
  });
});
