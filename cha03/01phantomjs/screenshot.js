//CasperJSでスクリーンショットをとる
//Casperオブジェクトを作成する

var casper = require('casper').create();


casper.start();

// ページを開く --- (※3)
casper.open('http://google.co.jp');

// その後、スクリーンショット撮影 --- (※4)
casper.then(function() {
  casper.capture("screenshot2.png");
});

// 実行 --- (※5)
casper.run();
