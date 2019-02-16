let RecommendationModel = require('../models/recommendation.model');
let express = require('express')
let router = express.Router()

// create a new recommendation
// Post Localhost:300/recommendation
router.post('/recommendation', (req, res)=>{
    if (!req.body){
        return res.status(400).send('Request body is missing.')
    }
//////////////////////////////////////
////The  expected data on come in/////
//////////////////////////////////////
    // let user ={
    //     name: "Firstname Lastname"
    //     yelp: "yelp url"
    //     description: "This restaurant is awesome"
    //     email: 'email@gmail.com'
    // }

    let model = new RecommendationModel(req.body) //<--- mongoose will take to the mogodriver and tell it to take the details the user posted and validate it via the recommendation model and save it to the database. 
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
router.get('/recommendation',(req, res) => {
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    RecommendationModel.findOne({
        email: req.query.email
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


//-------------------Update Request-----------------------
router.put('/recommendation', (req, res) =>{
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    RecommendationModel.findOneAndUpdate({
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

//-------------------Update Request-----------------------
router.delete('/recommendation', (req, res) =>{
    //calling in to recommendation and make sure the email exist
    if (!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    RecommendationModel.findOneAndRemove({
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