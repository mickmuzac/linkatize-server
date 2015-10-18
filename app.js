var express = require('express');
var fetcher = require('./utils/fetcher.js');
var app = express();

app.use(express.static('client'));

app.get('/fetch/:keyword', function(req, res){
    fetcher.getList(req.params.keyword, res);
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    var host = server.address().address;

    console.log("Server listening at http://%s:%s", host, port);
    fetcher.getList("road bike");
});
