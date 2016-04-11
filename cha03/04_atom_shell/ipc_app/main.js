//main.js

//必要モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

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

//同期メッセージの受信
ipc.on('mul-sync', function(event, arg){
  console.log(arg); //コンソールに表示
  event.returnValue = arg.a * arg.b;
});

//非受信同期メッセージの受信
ipc.on('mul-async', function(event, arg){
  console.log(arg);
  //レンダラープロセスへ返信
  var result = arg.a * arg.b;
  event.sender.send('mul-async-reply', result);
});
