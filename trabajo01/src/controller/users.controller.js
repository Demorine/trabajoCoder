const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
const Cart = require('../dao/models/cart.model')
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

router.get('/obtain-user', (req, res) => {
    try {

        if (!req.user) {
            throw new Error ('Usuario no autenticado')
        }

        const userId = req.session.user.id

        res.json({ userId })

    } catch (error) {
        res.json({error})
    }
})

router.get('/obtain-associated', async (req, res) => {
    try {

        if (!req.user) {
            throw new Error ('Usuario no autenticado')
        }

        const userId = req.session.user.id

        const cartId = await Cart.findOne({userId})

        console.log(userId,cartId)

        if (!cartId) {
            return res.status(404).json({ message: 'Carrito no encontrado' })
        }

        res.json({ cartId })

    } catch (error) {
        res.json({error})
    }
})

router.get('/failed-signup', (req, res) => {
    console.log('Registro fallido')
    return res.status(400).json({ status: 'error', error: 'Bad request' })
})

module.exports = router