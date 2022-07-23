var con = require('./connection');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/form.html');
});

app.post('/', function(req, res){
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

    con.connect(function(err){
        if(err) throw err;
        console.log('Connected to database');
        var sql = "INSERT INTO students (name, email, mno) VALUES ('"+name+"', '"+email+"', '"+mno+"')";
        con.query(sql, function(err, result){
            if(err) throw err;
           res.send('Data inserted' + result.insertID);
        });
    });
    
});

app.listen(8080);