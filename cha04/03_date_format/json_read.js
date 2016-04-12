//jsonデータを読み込む
var fs = require("fs");
//jsonファイルを読み込む
var json = fs.readFileSync("test.json", "utf-8");

//jsのオブジェクトに変換
var obj = JSON.parse(json);

//アイテム一覧を表示
var items = obj.items;
for(var i in items){
  var item = items[i];
  var name = item.name;
  var price = item.price;
  console.log(name, price);
}
