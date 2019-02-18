/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
//----------------------Importing---------------------------------

const express = require('express');
const app = express();
const mongoose = require("mongoose");

//----------------------Importing Models & Routes---------------------------------

//importing the entire models folder
const db = require('./src/models');

// const rts = require('./src/routes');

//-------------------Mongoose Connection---------------------------------
mongoose.connect("mongodb://localhost/3000", { useNewUrlParser: true });



//importing the route that we set up.
//Each route you want must be required individually. when I listen to entire folders the files arent found. as is the case with importing models and routes
const recommendationRoute = require('./src/routes/recommendation');
const path = require('path');
const bodyParser = require('body-parser');



//----------------------App Use---------------------------------
//look at the incoming request and if it is an application/json it means the data in the body is a json string. the bodyParser will take that string convert it to json and create a property in the request object called body. and set the value there.
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //<--- I believe we can use this in place of the above line.

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.use((req, res, next)=>{
    console.log( `${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})




app.use(recommendationRoute);
//We are making use of the express function called express.static to view all static pages in the public folder.
app.use(express.static('public'))
//Handler for 404 - Resource Not Found
//when there is no middleware to hande what the user types in then this will run.
app.use((req, res, next)=>{
    res.status(404).send('We think you might be lost!')
})
//Handler for Error 500
app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})


///////////////////
///    DATA    ////
//////////////////

// Moved to seed.js

///////////////////
//  ROUTES      //
/////////////////

// // define a root route: localhost:3000/
// app.get('/', function (req, res) {
//     res.sendFile('public/index.html' , { root : __dirname});
//   });

// app.get('/api/recommendations', function (req, res) {
//   // send all recommendation as JSON response
//   console.log('recommendation index');
//   res.json(recommendation);
// });


// // get one recommendation
// app.get('/api/recommendations/:id', function (req, res) {
//     // find one recommendation by its id
//     console.log('recommendations show', req.params);
//     for(var i=0; i < recommendations.length; i++) {
//       if (recommendations[i]._id === req.params.id) {
//         res.json(recommendations[i]);
//         break; // we found the right recommendation, we can stop searching
//       }
//     }
//   });







// Have express listen to a port.
//(**The Port value is defined in the command line before starting the project.**)
const PORT = process.env.PORT || 3000 //<-- if process.env.PORT doesnt exist listen to 3000

//Express is listening to a port on the machine. This port is 
app.listen(PORT, ()=> console.info(`Server has started on ${PORT}`))