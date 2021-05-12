const router = require('express').Router();
let Excerise = require('../models/exercise.modal');

router.route('/').get((req, res) => {
    Excerise.find()
        .then(excersie => res.json(excersie))
        .catch(err => res.status(400).json(`Error ${err}`))
})

// adding the excersie data
router.route('/adding').post((req, res) => {
    let errors = {};
    Excerise.findOne({
        username: req.body.username
    }).then((exercise) => {
        if (exercise) {
            errors.username = "username already exists"
            return res.status(406).json({ errors })
        } else {
            console.log('adding exercise')
            const username = req.body.username;
            const description = req.body.description;
            const duration = Number(req.body.duration);
            const date = Date.parse(req.body.date);

            const newExcersie = new Excerise({
                username, description, duration, date
            })

            newExcersie.save()
                .then(() => console.log(`Succeed in adding the exercise`))
                .catch((err) => res.status(400).json(`Error : ${err}`))
        }

    })
})

// getting all the data

router.route('/:id').get((req,res)=>{
    Excersie.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Excersie'))
        .catch(err => res.status(400).json(err => err))
})

router.route('/update/:id').post((req,res) => {
    const { username, description, duration, date } = req.body;
    console.log("🚀 ~ file: exercise.js ~ line 48 ~ router.route ~ date", date)
    console.log("🚀 ~ file: exercise.js ~ line 48 ~ router.route ~ duration", duration)
    console.log("🚀 ~ file: exercise.js ~ line 48 ~ router.route ~ description", description)
    console.log("🚀 ~ file: exercise.js ~ line 48 ~ router.route ~ username", username)
    
    Excerise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(()=> res.json(`exercise updated successfully`))
        .catch((err)=> res.status(400).json(`error in uploading the data ${err}`))
    })
    .catch(err => res.status(400).json(`Error ${err}`))
})

module.exports = router;