var fs = require('fs');
var cheerio = require('cheerio');
var list =[];

var $ = cheerio.load(fs.readFileSync('sample.html'));

$('div.pc.pc1.w0.h0 > div').each(function (i, item) {
	var code = $(item).text();
	list.push(code);
});
console.log(list);
