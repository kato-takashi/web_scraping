//urlにあるファイルをsagepathにダウンロードする

//ダウンロード元urlの指定
var url1 = "http://www.aozora.gr.jp/index_pages/person81.html";
var url2 = "http://www.aozora.gr.jp/index_pages/person148.html";

//保存パスの指定
var savepath1 = "miyazawakenji.html";
var savepath2 = "natsumesoseki.html";


//使用
download(url1, savepath1, function(){
  console.log("ok, kenji");
});

download(url2, savepath2, function(){
  console.log("ok, soseki");
});


//urlをsavepathの引数に取る関数
function download(url, savepath, callback){
  var http = require('http');
  var fs = require('fs');
  //出力先を指定
  var outfile = fs.createWriteStream(savepath);

  //非同期でurlからファイルをダウンロード
  http.get(url, function(res){
    res.pipe(outfile);
    res.on('end', function(){
      outfile.close();
      callback();
    });
  });
}
