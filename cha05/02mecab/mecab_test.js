//mecabからをNode.jsで使う
//モジュールの取り込み
var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var fs = require('fs');
var platform = require('os').platform(); // os判定

//形態素解析するテキスト
var srcText = "探しつづけなさい。そうすれば見出せます。\n";

//一時ファイル
var TMP_FILE = __dirname + '/__mecab_tempfile';
//Mecabのコマンドライン
var MECAB = 'mecab';
var ENCORDING = (platform.substr(0, 3) == 'win') ? 'SHIFT_JIS':'UTF-8';

//形態素解析を実行する関数
function parse(text, callback){
  //変換元テキストを一時ファイルに保存
  if(ENCORDING != 'UTF-8'){
    var buf = iconv.encode(text, ENCORDING);
    fs.writeFileSync(TMP_FILE, buf, "binary");
  }else{
    fs.writeFileSync(TMP_FILE, text, "UTF-8");
  }
  //コマンドを組み立てる
  var cmd = [
    MECAB, '"' + TMP_FILE + '"'
  ].join(" ");
  //コマンドを実行
  var opt = {encodeing: 'UTF-8'};
  if(ENCORDING != 'UTF-8') opt.encodeing = 'binary';
  exec(cmd, opt,
    function (err, stdout, stderr){
      if(err) return callback(err);
      var inp;
      //結果出力ファイルを元に戻す
      if(ENCORDING != 'UTF-8'){
        iconv.skipDecodeWarning = true;
        inp = iconv.decode(stdout, ENCORDING);
      }else{
        inp = stdout;
      }

      //結果をパースする
      inp = inp.replace(/\r/g, "");
      inp = inp.replace(/\s+$/, "");
      var lines = inp.split("\n");
      var res = lines.map(function(line){
        return line.replace('\t', ',').split(',');
      });
      callback(err, res);
    });
  }

  //形態素解析を実行する
  parse(srcText, function(err, result){
    for(var i in result){
      var word = result[i][0];
      var hinsi =  result[i][1];
      var yomi = result[i][8];
      if(word == "EOS") continue;
      console.log(word + ":" + hinsi + ":" + yomi);
  }
});
