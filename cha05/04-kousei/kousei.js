//文章の校正ツール
var MAX_WORD = 40;

var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

//引数をチェック
var args = process.argv;
args.shift(); //除去　'node'
args.shift(); //除去　スクリプトパス
if(args.length <= 0){
  console.log('node kousei.js textfile');
  process.exit();
}
var filename = args.shift();

//ファイルを読み込む
var text = fs.readFileSync(filename, "utf-8");
//形態素解析を行う
mecab.parse(text, function(err, items){
  checkSentences(items);
});

//文章をチェックする
function checkSentences(items){
  checkJosiNo(items);
  checkTaiou(items);
}

//助詞の「の」の連続と単語数の長さを確認する
function checkJosiNo(items){
  var cnt = 0; //助詞「の」が出現した回数を数える
  var cur = []; //現在読み込んでいる文を保存する
  var lineno = 1; //行番号を数える
  for(var i in items){
    var it = items[i];
    var w = it[0];
    if(w == "EOS"){
      lineno++;
      cur = [];
      cnt = 0;
      continue;
    }

    //文末及び句点の確認
    if(w =="。" ||　w =="、"){
      //「の」の回数
      if(cnt >= 3){
        console.log("【警告】助詞「の」が" + cnt + "回連続しています。");
        console.log("\t(" + lineno + "行目）" + cur.join(""));
      }
      //単語数を確認する
      if(cur.length >= MAX_WORD){
        console.log("【警告】一文が長すぎます。" + cur.length + "以上の単語です。");
        console.log("\t(" + lineno + "行目）" + cur.join(""));
      }
      cnt = 0;
      if(w == "。"){
        cur = [];
      }
      continue;
    }
    //「の」があるかを確認
    if(it[0] == "の" && it[1] == "助詞") cnt++;
    cur.push(w);
  }
}

// 対応チェック
function checkTaiou(items){
  var heiritujosi = 0, cur = [], lineno = 1,
  meisi = {}, setuzokusi = {}, oldCur = [];
  for(var i in items){
    var it = items[i];
    var w = it[0];
    if(w == "EOS"){ //改行
      lineno++;
      setuzokusi = {};
      oldCur = cur;
      cur = [];
      continue;
    }

    //文末の処理
    if(w == "。"){
      if(heiritujosi == 1){
        console.log("【警告】並立助詞「〜たり」が一度しか出現しません。");
        console.log("\t(" + lineno + "行目)" + cur.join(""));
      }
      oldCur = cur;
      cur = [];
      heiritujosi=0;
      continue;
    }

    //並立助詞「たり」のチェック
    if(it[2] == "並立助詞" && (w=="たり" || w== "だり")){
      heiritujosi++;
    }

    //接続詞チェック(一行に同じ接続詞が出てこないようにする)
    if(it[1] == "接続詞"){
      if(typeof(setuzokusi[w]) == "undefined"){
        setuzokusi[w] = 1;
      }else{
        console.log("【警告】一行に同じ接続詞「"+w+"」が複数回使われています。");
        console.log("\t(" + lineno + "行目)" + cur.join(""));
      }
    }

    //表記の揺れチェック
    if(it[1] == "名刺" && w.length >=2){
      var kana = it[8];
      if(kana == undefined) kana = it[0]; //辞書にない単語対策
      kana = kana.replace(/ー/g, ''); //カタカナ対策
      if(meisi[kana] == undefined){
        meisi[kana] = w;
      }else if(meisi[kana] != w){
        console.log("【確認】表記の揺れ：" + meisi[kana] + " != " + w);
      }
    }
    cur.push(w);
  }
}
