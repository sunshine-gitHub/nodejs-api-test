var mysql  = require('easy-mysql');
var express = require('express');
var cors = require('cors');
var http = require('http');
var app = express();
app.use(cors({}));
var bodyParser = require('body-parser');

//数据库参数
var settings = {    
  host     : 'localhost',       
  user     : 'root',              
  password : '1234',       
  port: '3306',                   
  database: 'test', 
}; 
//连接数据库
var connection = mysql.connect(settings);

//设置启动端口
var port = 3000;
// 获取一个express的路由实例
var apiRoutes = express.Router();
//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// =======================
// 路由 ================
// =======================

//测试api
apiRoutes.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//增
apiRoutes.post('/user/insert', function(req, res) {
	var name = req.body.name;
	var age = req.body.age;
	var sql = 'insert into user(name,age) values(?,?)';
	connection.execute(sql, [name,age], function (err, results) {
		 if (err) throw err;
		  console.log('User saved successfully');
        res.json({ success: true });
	});
   
});

//删---根据id
apiRoutes.post('/user/delete', function(req, res) {
	var userId = req.body.id;
	var sql = 'delete from user where id = ?';
	connection.execute(sql, [userId], function (err, result) {
     if (err) throw err;
	 console.log('delete successfully');
	 res.json({ success: true });
	});
});

//改---根据id改名字
apiRoutes.post('/user/update', function(req, res) {
	var userId = req.body.name;
	var userId = req.body.id;
	var sql = 'update user set name = ? where id = ?';
	connection.execute(sql, [name,userId], function (err, result) {
     if (err) throw err;
	 console.log('update successfully');
	 res.json({ success: true });
	});
});

//查--根据id
apiRoutes.post('/user/getOne', function(req, res) {
	console.log(req.body);
	var userId = req.body.id;
	
	var sql = 'select * from user where id = ?';
	connection.get_one(sql, [userId], function (err, result) {
     if (err) throw err;
	 console.log('getOne successfully');
	 res.json({ "name": result.name, "age": result.age});
	});
});

//查
apiRoutes.get('/user/getAll', function(req, res) {
	var sql = 'select * from user';
	connection.query(sql, function (err, result) {
     if (err) throw err;
	 console.log('getAll successfully');
	 var result = JSON.stringify(result);
	  var html = '<html>'  
        +'<head>'  
        +'<title>nodejs</title>'  
        +'</head>'  
        +'<body>'  
        +   result 
        +'</body>'  
        +'</html>';  
	  res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write(html);  
        res.end();
	});
});

// 应用apiRoutes，并在前面加前缀 /api
app.use('/api', apiRoutes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

 
