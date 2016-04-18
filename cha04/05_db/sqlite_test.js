//モジュールの取り込み
var sqlite3 = require('sqlite3').verbose();
//ローカルのDBを開く
var db = new sqlite3.Database('test1.sqlite');

db.serialize(function(){
  //SQLを実行してテーブルを作成
  db.run('CREATE TABLE IF NOT EXISTS items(name, value)');

  //プリペアードステートメントでデータを挿入
  var stmt = db.prepare('INSERT INTO items VALUES(?,?)');
  stmt.run(["Banana", 300]);
  stmt.run(["Apple", 150]);
  stmt.run(["Mango", 250]);
  stmt.finalize();

  //データを取り出す
  db.each("SELECT * FROM items", function(err, row){
    console.log(row.name + ":" + row.value);
  });
});

db.close();
