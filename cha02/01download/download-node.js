//urlにあるファイルをsagepathにダウンロードする

//ダウンロード元urlの指定
var url = "http://kujirahand.com/";

//保存パスの指定
var savepath = "test.html";

//利用モジュールの取り込み
var http = require('http');
var fs = require('fs');

//出力先を指定
var outfile = fs.createWriteStream(savepath);

//非同期でurlからファイルをダウンロード
http.get(url, function(res){
  res.pipe(outfile);
  res.on('end', function(){
    outfile.close();
    console.log("ok");
  });
});
