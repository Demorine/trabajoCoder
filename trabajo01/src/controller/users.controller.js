const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
// const { createHash } = require('../utils/crypt-password.util')


const router = Router()

router.post('/',
 passport.authenticate('register',
 {failureRedirect: '/api/users/failed-signup'}),
  async (req, res) => {

    try {
        // const {first_name, last_name, email, password} = req.body

        // const newUserInfo = {
        //     first_name,
        //     last_name,
        //     email,
        //     password: createHash(password)
        // }

        // const user = await User.create(newUserInfo)
    res.json({status: 'success', message: req.user})
    //res.redirect('/login')
    } catch (error) {
        res.json({error})
    }

})

router.get('/failed-signup', (req, res) => {
    console.log('Registro fallido')
    return res.status(400).json({ status: 'error', error: 'Bad request' })
})

module.exports = router