//main.js

//必要モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');

//メインウィンドウを起動
var mainWindow = null;

//準備ができたタイミングで呼ばれるイベント
app.on('ready', function(){
  //メインウィンドウ
  mainWindow = new BrowserWindow({width:800, height:600});
  //自分のディレクトリのhtmlを読み込み
  var Target_URL = 'https://atom.io';
  mainWindow.loadUrl(Target_URL);
  //ページがロードしたらキャプチャ
  mainWindow.webContents.on('did-finish-load', captureFunc);
});

//キャプチャ処理
function captureFunc(){
  mainWindow.capturePage(function(img){
      fs.writeFileSync('screenshot.png', img.toPng());
  });

}
