//main.js

//必要モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');

//メインウィンドウを起動
var mainWindow = null;

//準備ができたタイミングで呼ばれるイベント
app.on('ready', function(){
  //メインウィンドウ
  mainWindow = new BrowserWindow({width:800, height:600});
  //自分のディレクトリのhtmlを読み込み
  var Target_URL = 'file://' + __dirname +'/index.html';
  mainWindow.loadUrl(Target_URL);
  mainWindow.on("close", function(){
    mainWindow = null;
  });
});
