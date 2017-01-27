var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// setting up a route to handle an input .
router.get('/:time', function(req,res){
// use the unix time to create a new date and convert it to seconds.
   function fromUtoN(unix) {
     var date = new Date(unix * 1000);
     var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
//  accessing the month array .
     var month = months[date.getMonth()];
     var day = date.getDate();
     var year = date.getFullYear();
     result = month + ' ' + day + ', '+year;
     return result;
   }
// if the route is a number then call the function and pass on the param.
 if(!isNaN(req.params.time)){
   var result = fromUtoN(req.params.time);
   // bulding and object containing unix key and the natural key .
   var data = { unix: req.params.time, natural: result};
   // passing the result as JSON .
   res.json(data);
   // the input is a natural date format .
 } else {
   var natural = new Date(req.params.time);
   if(!isNaN(natural)) {
     var unix = natural / 1000;
     var data = { unix: unix, natural: req.params.time };
     res.json(data);
     // input is not apropriate . 
   } else{
       res.json({unix: null, natural: null });
     }
 }

});

module.exports = router;
