//main.js
//wikipediaを表示するためのプログラム
var Target_URL = "http://ja.wikipedia.org/";

//必要モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');

//メインウィンドウを起動
var mainWindow = null;

//準備ができたタイミングで呼ばれるイベント
app.on('ready', function(){
  //メインウィンドウ
  mainWindow = new BrowserWindow({width:800, height:600});
  //指定のURLを読み込み
  mainWindow.loadUrl(Target_URL);
});
