var express = require('express');
var bodyParser = require('body-parser');

/*************************** INIZIALIZZAZIONE *****************************/
// instantiate express
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;
// get an instance of the express Router
var router = express.Router();
/***************************************************************************/

// test route to make sure everything is working
router.get('/', function (req, res) {
  res.status = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to our API!!!!!!' });
});

router.route('/getArea')
  .get(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    if(req.query.side1 != null && req.query.side2 != null) { // se sono specificati sia side1 che side2

    }
    else { // altrimenti, invio errore
      res.send({ area: -1 });
    }
  });


/*
router.route('/assignments')

  // create a assignment
  // accessed at POST http://localhost:8080/api/v1/assignments
  .post(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    // create a new instance of the Assignment model
    var assignment = new Assignment();
    // set the assignments name (comes from the request)
    assignment.assignmentId = req.body.assignmentId;
  	assignment.studentId = req.body.studentId;
  	assignment.assignment = req.body.assignment;
  	assignment.assignmentType = req.body.assignmentType;
  	assignment.assignmentValuation = req.body.assignmentValuation;

    // save the assignment and check for errors
    assignment.save(function (err) {
      if (err) { res.send({ error: { message: "Item not found" }}) }
      else{
        res.json(assignment);
      }
    });
  })

  // get all the assignments
  // accessed at GET http://localhost:8080/api/v1/assignments
  // variante: questo server risponde anche se gli viene specificata come query
  // del GET lo studentId, ritornando tutti gli assignment con lo studentId specificato.
  // accessed at GET http://localhost:8080/api/v1/assignments/?studentId=177928
  .get(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    if(req.query.studentId == null) { // se NON è specificato lo studentId, allora ritorno tutti gli assignments
      Assignment.find(function (err, assignments) {
        if (err) { res.send({ error: { message: "Item not found" }}) }
        else{
          res.json(assignments);
        }
      });
    }
    else {
      Assignment.find( {'studentId': req.query.studentId}, function (err, assignments) {
        if (err) { res.send({ error: { message: "Item not found" }}) }
        else{
          res.json(assignments);
        }
      });
    }
  });

// route /assignments/assignment
router.route('/assignments/:assignment_id')

  // get the assignment with that id
  // (accessed at GET http://localhost:8080/api/assignments/:assignment_id)
  .get(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    Assignment.findOne( {'assignmentId': req.params.assignment_id}, function (err, assignment) {
      if (err) { res.send({ error: { message: "Item not found" }}) }
      else{
        res.json(assignment);
      }
    });
  })

  // update the assignment with this id
  // (accessed at PUT http://localhost:8080/api/v1/assignments/:assignment_id)
  .put(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    // use our assignment model to find the assignment we want
    // ATTENZIONE!: usare findOne, e non find, altrimenti ritorna una collezione di oggetti, e bisogna estrarre il primo!
    Assignment.findOne( {'assignmentId': req.params.assignment_id}, function (err, assignment) {
      if (err) { res.send({ error: { message: "Item not found" }}) }
      else{
        // update the assignments info
        if(assignment != null){
          if(req.body.assignmentId != null) assignment.assignmentId = req.body.assignmentId;
        	if(req.body.studentId != null) assignment.studentId = req.body.studentId;
        	if(req.body.assignment != null) assignment.assignment = req.body.assignment;
        	if( req.body.assignmentType != null) assignment.assignmentType = req.body.assignmentType;
        	if(req.body.assignmentValuation != null) assignment.assignmentValuation = req.body.assignmentValuation;
          // save the assignment
          assignment.save(function (err) {
            if (err) { res.send({ error: { message: "Item not found" }}) }
            else{
              res.json(assignment);
            }
          });
        }
        else{
          res.status = 404;
          res.json({ error: { message: "Item Not Found" } });
        }
      }
    });
  })

  // delete the assignment with this id
  // (accessed at DELETE http://localhost:8080/api/v1/assignments/:assignment_id)
  .delete(function (req, res) {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    Assignment.remove( {'assignmentId': req.params.assignment_id}, function (err, assignment) {
      if (err) { res.send({ error: { message: "Item not found" }}) }
      else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });


*/

/*************************** MIDDLEWARE CORS ********************************/
// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening: ' + req.method);
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});
/**************************************************************************/

// register our router on /api
app.use('/api/v1', router);

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ area: -1 });
});


app.listen(port);
console.log('Magic happens on port ' + port);
module.exports = router;
