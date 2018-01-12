var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send("Benvenuto!")
})

var apiArithmetic = express.Router();

apiArithmetic.get('/getArea', function(req, res){
  res.status = 200;
  res.setHeader('Content-Type', 'application/json');
  if((req.query.side1 != null) && (req.query.side2 != null)){
    var x = parseFloat(req.query.side1)
    var y = parseFloat(req.query.side2)
    var z = x * y

    res.json({"area": z})
  }
  else {
    res.status = 400;
    res.json({"area": -1})
  }
});


app.use('/', apiArithmetic);

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({"area": -1});
});


app.listen(port)
console.log("Server started");
