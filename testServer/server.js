var http = require('http');
var urlUtil = require('url');
var path = require('path');
var fs = require('fs');
var Converter = require("csvtojson").Converter;


console.log('start ……');

function WriteResponseJson(res, data){

	res.writeHead(200,"OK",{
		"Content-Type":"application/json"
	});

	res.end(data);
}

function QueryParse(query) {
	var obj = {};
	var reg = /([^?&=]+)=([^?&=]*)/g;
	query.replace(reg, function (rs, $1, $2) {
		var name = decodeURIComponent($1);
		var val = decodeURIComponent($2);                
		val = String(val);
		obj[name] = val;
		return rs;
	});
	return obj;
}

http.createServer(function (req, res){

	var urlParse = urlUtil.parse(req.url);
	if(req.method == "OPTIONS"){

		res.writeHead(200,"OK",{
			"Access-Control-Allow-Headers":"Content-Type",
			"Access-Control-Allow-Methods":"*",
			"Access-Control-Allow-Origin":"*"
		});
		res.end();
	}else if(req.method == "GET" && urlParse.pathname == '/csv'){

		var filename = QueryParse(urlParse.query).filename;
		if(filename){

			var pathname = path.join(__dirname,filename);
			fs.stat(pathname + '.json', function(err, stats){

				if(err){

					var csvConverter = new Converter({constructResult:false,toArrayString:true});

					var readStream = fs.createReadStream(pathname + ".csv");

					var writeStream = fs.createWriteStream(pathname +'.json');

					readStream.pipe(csvConverter).pipe(writeStream);
				}

				
				fs.readFile(pathname +'.json','utf-8',function(err,data){
					if(!err){

						var jsonStr = '{ data:'+ data.replace(/\r/g,'').replace(/\n/g,'') +' }';
						WriteResponseJson(res,jsonStr);
					}
				});

			});


			// if(!fs.statSync().isFile()){

			// 	var csvConverter = new Converter({constructResult:false});

			// 	var readStream = fs.createReadStream(pathname + ".csv");

			// 	var writeStream = fs.createWriteStream(pathname +'.json');

			// 	readStream.pipe(csvConverter).pipe(writeStream);
			// }

			
		}

		
	}else{

		res.end('O__O "…');
	}


}).listen(4000);