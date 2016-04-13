//地域防災拠点を読む
var cheerio = require('cheerio');
var fs = require('fs');

//xmlファイルを読む
var xml = fs.readFileSync("shelter.xml", "utf-8");

//xmlファイルをパースする
$ = cheerio.load(xml);

//各防災拠点順にチェック
$('Shelter').each(function(i, el){
  //名前と地区を画面に表示
  var name = $(this).children("Name").text();
  var ward = $(this).children("Ward").text();
  console.log(ward, name);
});
