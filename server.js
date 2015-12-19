var http = require("http")
var cheerio = require("cheerio")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("connected At localhost:"+port);


function getHtmlFromUrl(url, cb){

  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      cb(null, data);
    });
  }).on("error", function() {
    cb(null);
  });

}

app.get('/getTeamData', function(req, res, next) {
var url = "http://atherenergy.com/about/";

	getHtmlFromUrl(url,function(err, data){
		if(err){
			console.log("Error : ",err);
		}else{
			 var $ = cheerio.load(data);
			 var members = [];
			 console.log($(".team-member-block").length);
			 $(".team-member-block").each(function(index , element){
			 	var member = {};
			 	member.desc = $(element).data("writeup");
			 	member.image = $(element).find("img").attr("src");
			 	var children = $(element).children();
			 	member.name = $(element).find("p").html();
			 	members.push(member);
			 });
		    res.json({ members:  members});
		}
	});
});
