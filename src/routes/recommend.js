
let express = require('express')
let router = express.Router()
let db = require('../models')
let RecommendModel = db.RecommendModel

// create a new recommend
// Post Localhost:300/recommend
router.post('/recommend', (req, res)=>{
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
        .then(doc =>{ //<-----This is a promise and promises handle error and catch.
            if (!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

//-------------------Get Request-----------------------
router.get('/recommend',(req, res) => {
    console.log('route triggered')
    RecommendModel.find()
    .exec((err,data)=>{
        if (err){
            res.send(err)
        }
        res.send(data)
    })
})


//-------------------Update Request-----------------------
router.put('/recommend', (req, res) =>{
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    db.RecommendModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })

})

//-------------------Delete Request-----------------------
router.delete('/recommend', (req, res) =>{
    //calling in to recommend and make sure the email exist
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    RecommendModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


module.exports = router 