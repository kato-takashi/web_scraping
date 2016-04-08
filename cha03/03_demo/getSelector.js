var a_list = document.querySelectorAll("#header_menu_linkbar a");
//要素一覧を巡回してURLを取得
for(var i=0; i<a_list.length; i++){
  var a = a_list[i];
  console.log(a.href);
}
