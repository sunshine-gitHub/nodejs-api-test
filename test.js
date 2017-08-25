var mysql  = require('easy-mysql');
var express = require('express');
 var http = require('http');
var app = express();
var settings = {    
  host     : 'localhost',       
  user     : 'root',              
  password : '1234',       
  port: '3306',                   
  database: 'test', 
}; 



var connection = mysql.connect(settings);
//connection.connect();
 

//²éÑ¯Êý¾Ý¿â
 http.createServer(function(req, res){  
	 var  sql = 'SELECT * FROM user';
    connection.query(sql, function(err, rows) {

		if (err) 
		{
			 console.log('request error!');
			throw err;
		}
		//var userinfo = JSON.stringify(rows);
		 var html = '<html>'  
        +'<head>'  
        +'<title>nodejs</title>'  
        +'</head>'  
        +'<body>'
		+'<br><br>'
        +'name:<span id="username"></span><br>'
		+'age:<span id="age"></span>'
		+'<script>document.getElementById("username").innerHTML = "'
		+ rows[0].name
		+'";'
		+'document.getElementById("age").innerHTML = "'
		+ rows[0].age
		+'";</script>'
        +'</body>'  
        +'</html>';  
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write(html);  
        res.end();
	});
}).listen(3000); 
//app.listen(3000);

 
