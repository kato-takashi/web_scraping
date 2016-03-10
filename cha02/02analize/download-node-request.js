var request = require('request');
var fs = require('fs');

//URLの指定
var url = "http://kujirahand.com/";
var savepath = "test.html"

request(url).pipe(fs.createWriteStream(savepath));
