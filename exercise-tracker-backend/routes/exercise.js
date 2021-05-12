const router = require('express').Router();
let Excerise = require('../models/exercise.modal');

router.route('/').get((req, res) => {
    Excerise.find()
        .then(excersie => res.json(excersie))
        .catch(err => res.status(400).json(`Error ${err}`))
})

// adding the excersie data
router.route('/adding', (req, res) => {
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

router.get('/:id').get((req,res)=>{
    Excersie.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Excersie'))
        .catch(err => res.status(400).json(err => err))
})


module.exports = router;