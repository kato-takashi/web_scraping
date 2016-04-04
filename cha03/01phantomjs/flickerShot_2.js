//Flickerで検索しスクリーンショットをとる for CasperJS
//CasperJsのオブジェクトを作成
var casper = require('casper').create();

//CasperJSの処理を開始する
casper.start();

//画面サイズを指定する
casper.viewport(1400, 800);

//userAgentの指定
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

// //Flickerのサイトで猫を検索
var text = encodeURIComponent("ネコ");
casper.open('https://www.flickr.com/search/?text=' + text);

//
// //その後、画面キャプチャ
casper.then(function(){
  this.capture('flickr-cat.png',{
    top:0, left:0, width: 1400, height: 800
  });
});



casper.run();
