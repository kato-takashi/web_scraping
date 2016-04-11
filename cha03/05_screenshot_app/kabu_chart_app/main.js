// 東京証券取引所の株価指数グラフのページ
var TARGET_URL = "http://quote.jpx.co.jp/jpx/template/quote.cgi?F=tmp/hist_index&basequote=151&mode=D";

//モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');

//撮影までの待ち時間
var DELAY_TIME = 1000 * 1; //1秒


///メインウィンドウを起動
var win = null;
app.on('ready', function(){
  win = new BrowserWindow({width:800, height:800});
  win.loadUrl(TARGET_URL);
  //ページがロードを完了したらキャプチャをする
  win.webContents.on('did-finish-load', captureFunc);
});

///キャプチャ処理
function captureFunc(){
  setTimeout(function(){
    //日付つきのファイル名で保存
    var t = new Date();
    var fname = "kabu_" + t.getFullYear() + "-" + (1+ t.getMonth()) + "-" + t.getDate() + ".png";
    win.capturePage(function(img){
      fs.writeFileSync(fname, img.toPng());
      app.quit(); //アプリを自動終了
    });
  }, DELAY_TIME);
}
