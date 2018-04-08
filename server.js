var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
let fs = require('fs');

app.set("port", process.env.PORT || 8000);

app.use(logger('dev'));

//routing
app.use('/',express.static(path.join(process.cwd(), 'public')));
app.get('/', function(req,res){
  res.sendFile(path.join(process.cwd(),'/index.html'));
});
app.get('/restaurant.html', function(req,res){
  res.sendFile(path.join(process.cwd(),'/restaurant.html'));
});
app.get('/restaurantdata', function(req,res){
  res.sendFile(path.join(process.cwd(),'data','restaurants.json'));
});
app.get('/restaurantdata/:id', (req,res)=>{
    console.log(res.query)
});

app.listen(app.get("port"), function(){
    console.log('Http server listening on port '+app.get("port"));
})
