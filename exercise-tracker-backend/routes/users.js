const router = require('express').Router();
let User = require('../models/user.modal');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`))
})

router.route('/add').post((req, res) => {
    let errors = {};
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (user) {
            errors.username = 'username is already exists'
            return res.status(406).json({errors})
        } else {
            const username = req.body.username;
            const newUser = new User({ username })
            newUser.save()
                .then(() => console.log('yeh, user has been added'))
                .catch(err => res.status(400).json(`User is not able to add : ${err}`))
        }
    })

})

module.exports = router;