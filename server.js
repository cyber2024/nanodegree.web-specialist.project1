var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');

app.set("port", process.env.PORT || 8000);

app.use(logger('dev'));

//routing
app.use('/',express.static(path.join(process.cwd(), 'public')));
app.get('/', function(req,res){
  res.sendFile(process.cwd()+'/index.html');
});
app.get('/restaurant.html', function(req,res){
  res.sendFile(process.cwd()+'/restaurant.html');
});

app.listen(app.get("port"), function(){
    console.log('Http server listening on port '+app.get("port"));
})
