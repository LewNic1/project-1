let express = require('express')
let router = express.Router()
let db = require('../models')
let RecommendModel = db.RecommendModel

// create a new recommend
// Post Localhost:300/dashboard/recommend
router.post('/dashboard/recommend', (req, res) => {
    if (!req.body){
        return res.status(400).send('Request body is missing.')
    }
    //////////////////////////////////////
    ////The  expected data on come in/////
    //////////////////////////////////////
    // let user ={
    //     name: "Firstname Lastname"
    //     email: 'email@gmail.com'
    // }

    let model = new RecommendModel(req.body) //<--- mongoose will take to the mogodriver and tell it to take the details the user posted and validate it via the recommend model and save it to the database. 
    model.save()
    //     if(err) return console.log(err);
    //     console.log(user);
    //     res.json(user);
    // })
        .then(doc => { //<-----This is a promise and promises handle error and catch.
            console.log(doc);
            if (!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

//-------------------Get Request-----------------------
router.get('/dashboard/recommend',(req, res) => {
    console.log('route triggered')
    RecommendModel.find()
    .exec((err,data)=>{
        if (err){
            res.send(err)
        }
        res.send(data)
    })
})

router.get('/dashboard/recommend/:author',(req, res) => {
    console.log('route triggered')
    RecommendModel.find({author: req.params.author})
    .exec((err,data)=>{
        if (err){
            res.send(err)
        }
        res.send(data)
    })
})


// JJ --> I'm creating a route in response to the login page's form password input
// let url = 'http://localhost:4000/dashboard';
// router.get('/??????access to input/value via val()??????????',(req, res) => {
//     console.log('password route triggered')
//     RecommendModel.find()
//     .exec((err,data)=>{
//         if (err){
//             res.send(err)
//         }
//         // res.send(data)
//         res.redirect(url);
//     })
// })

//-------------------Update Request-----------------------
router.put('/dashboard/recommend/:id', (req, res) =>{
    console.log('update route accessed',req.params);
    let recId = req.params.id;
    console.log('update route accessed with', req.body);
    RecommendModel.findOneAndUpdate({_id: recId},req.body,{new: true})
        .exec((err, updatedRec)=>{
            if (err) {
                console.log(err);
            }
            res.json(updatedRec);
        });
});

//-------------------Delete Request-----------------------
router.delete('/dashboard/recommend/:id', (req, res) =>{
    console.log('delete route accessed',req.params);
    let recId = req.params.id;
    RecommendModel.findByIdAndDelete(recId)
        .exec((err,deletedRec)=>{
            if (err) {
                console.log(err);
            }
            res.json(deletedRec);
        });
});


module.exports = router