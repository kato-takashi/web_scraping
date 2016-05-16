// Flickrで写真検索 for Node.js

// APIキーを指定 以下を書き換えてください ----- (※1)
var keys = {
  api_key: 'your key'
};

// Flickrオブジェクトを作成 ------- (※2)
var Flickr = require('node-flickr');
var fs = require('fs');
var request = require('request');
var flickr = new Flickr(keys);

//何の写真を検索するか
var KEYWORD = "ブラジル";
var PHOTO_DIR = __dirname + "/photo";

//Flickrオブジェクトを作成
var flickr = new Flickr(keys);

//ダウンロードフォルダを作成
if(!fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR);

// 画像を検索 --- (※3)
flickr.get("photos.search", {
              "text": encodeURIComponent(KEYWORD),
              "sort": "interestingness-desc",
              "per_page": 20,
              "license": 4 //creativecommons
            },
            function(err, result){
              if (err) return console.error(err);
              // console.log(result.photos);
              // // 写真数の情報 ----- (※4)
              // var page = result.photos.page;
              // var pages = result.photos.pages;
              // var perpage = result.photos.perpage;
              // var total = result.photos.total;
              // console.log("total:", total);
              // 各写真の詳細情報を取得する
              var photo_list = result.photos.photo;
              for (var i in photo_list) {
                var p = photo_list[i];
                // URLを生成 ---- (※5)
                var url = "https://farm" + p.farm + ".staticflickr.com/" +
                  p.server + "/" + p.id + "_" + p.secret + ".jpg";
                console.log(p);
                console.log("URL:" + url);
                //ファイル名を生成
                var fname = PHOTO_DIR + "/" + p.id + ".jpg";
                console.log("+ " + p.title);
                console.log("| URL:" + url);

                //保存
                request(url).pipe(fs.createWriteStream(fname));
              }
            });
