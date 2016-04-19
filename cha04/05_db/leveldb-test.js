//levelDBの利用例
//モジュールの取り込みとDBを開く
var levelup = require('level');
var db = levelup('./testdb');

//値を設定
db.put('Apple', 'red', function(err){
  if(err){
    console.log('Error', err);
    return;
  }
  testGet();
});

//値の取得
function testGet(){
  db.get('Apple', function(err, value){
    if(err){
      console.log('Error', err);
      return;
    }
    console.log('Apple= '+ value);
    testBatch();
  });

  //一括設定
  function testBatch(){
    db.batch()
    .put('Mango', 'yellow')
    .put('Banana', 'yellow')
    .put('Kiwi', 'yellow')
    .write(function(){
      testGet2();
    });
  }

  //値の取得　その2
  function testGet2(){
    db.get('Banana', function(err, val){
      console.log('Banana= '+val);
      // testKeys();
    });
  }
}
