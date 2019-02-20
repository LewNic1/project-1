// I used this tutorial as a guide.
// https://www.youtube.com/watch?v=o3ka5fYysBM
// https://docs.google.com/presentation/d/1VSlo9JEsoVjNNH4DqOJtSWInKIis5p39lmHvAcLifSw/edit#slide=id.g361772e256_1_3404
//--------------------------------------------------------------------------------------------

/////////////////////////////
//  SERVER-SIDE JAVASCRIPT //
/////////////////////////////


/////////////////////////////
// SETUP and CONFIGURATION //
/////////////////////////////

//----------------------Importing---------------------------------

const express = require('express');
const app = express();
const mongoose = require("mongoose");

//-------------------Mongoose Connection---------------------------------
// mongoose.connect("mongodb://localhost/wce-app", { useNewUrlParser: true });



//-------------------Route Connection---------------------------------
const recommendRoute = require('./routes/recommend');

//-------------------Path & Body Parser---------------------------------
const path = require('path');
const bodyParser = require('body-parser');

//----------------------App Use---------------------------------
//look at the incoming request and if it is an application/json it means the data in the body is a json string. the bodyParser will take that string convert it to json and create a property in the request object called body. and set the value there.
app.use(bodyParser.json());

app.use((req, res, next)=>{
    console.log( `${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(recommendRoute);


//I am making use of the express function called express.static to view all static pages in the public folder.
app.use(express.static('public'))
//Handler for 404 - Resource Not Found
//when there is no middleware to hande what the user types in then this will run.
app.use((req, res, next)=>{
    res.status(404).send('Darnell thinks you might be lost... Therefore you are lost. Sorry there are no maps -__-.')
})
//Handler for Error 500
app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})




// Have express listen to a port.
//(**The Port value is defined in the command line before starting the project.**)
const PORT = process.env.PORT || 4000 //<-- if process.env.PORT doesnt exist listen to 3000

//Express is listening to a port on the machine. This port is 
app.listen(PORT, ()=> console.info(`Server has started on ${PORT}`))