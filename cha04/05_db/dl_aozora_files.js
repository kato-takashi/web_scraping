// 青空文庫の人気作品30をダウンロードする for Node.js
//
// 人気作品の2014年ランキングのページ
var URL_RANKING = "http://www.aozora.gr.jp/access_ranking/2014_xhtml.html";
var MAX_RANK = 30; //30位まで
var SAVE_DIR = __dirname + "/aozara";

//モジュールの取り込み
var client = require('cheerio-httpcli');
var fs = require('fs');
var URL = require('url');

//作品一覧データの保存用
var cardlist = [];

//作品データ保存用のディレクトリを作る
if(!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR);

//ランキングページをダウンロード
client.fetch(URL_RANKING, function(err, $, res){
  if(err){
    console.log("DL error");
    return;
  };
  //ランキングのテーブル全行を取得
  var tr = $("table.list tr");
  if(!tr){
    console.log("ページの形式エラー");
    return;
  };

  //テーブル各行の反復
  for(var i=0; i<tr.length; i++){
    //必要要素を調べる
    var cells = tr.eq(i).children();
    var rank = parseInt(cells.eq(0).text());
    var link = cells.eq(1);
    var href = link.children('a').attr('href');
    var name = link.text().replace(/(^\s+|\s+$)/, "");
    // console.log(rank, name, href);
    if(isNaN(rank) || rank>MAX_RANK) continue;
    //相対パスを絶対パスに変換する
    href = URL.resolve(URL_RANKING, href);
    cardlist.push([rank, name, href]);
    console.log(rank, name, href);
  }
  //ダウンロード
  downloadNextFile();
});

//各作品をダウンロードする
function downloadNextFile(){
  // console.log("DL開始");
  if(cardlist.length ===0){
    console.log("処理完了");
    return;
  }

  //遅延処理
  setTimeout(function(){
    var card = cardlist.shift();
    downloadCard(card);
  }, 1000);
}

//カードをダウンロードする
function downloadCard(card){
  var index = card[0], name = card[1], link = card[2];
  console.log("図書カード" + index + ":" + name);
  client.fetch(link, function(err, $, res){
    if(err){
      console.log("ERROR");
      return;
    }
    //すべてのリンクを取得し、作品ページを類推する
    var xhtml_link = "";
    $("a").each(function(idx){
      var text = $(this).text();
      var href = $(this).attr('href');
      if(text.indexOf("XHTML版で読む") >= 0){
        //相対パスを絶対パスへ変換
        href = URL.resolve(link, href);
        xhtml_link = href;
        return false; //これ以降はeachしない
      }
    });

    if(xhtml_link == ""){
      console.log("作品リンクが見つかりません");
    }

  });
}
