/**********************************/
/***********import des modules*****/

const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


/**routage de la ressource User* */
//fonction de s'inscrire
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé' }))
                .catch(error => res.status(500).json({ error }))
        })
}
//fonction de se connecter
exports.login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'bad request' })
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(usr => {
            if (usr === null) {
                return res.status(401).json({ message: "this account doesnt exist" })
            }

            bcrypt.compare(password, usr.password)

                .then(test => {
                    if (!test) {
                        return res.status(401).json({ message: 'mauvais mot de passe' })
                    }

                    //génération du token
                    const token = jwt.sign({
                        user_id: usr._id
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })
                    return res.json({ token: token, userId: usr._id })

                })
                .catch(error => res.status(500).json({ message: 'login failed' }))
        })
        .catch(error => res.status(500).json({ message: 'datbase error' }))
}

