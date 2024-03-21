const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
const { isValidPassword } = require('../utils/crypt-password.util')
const { generateToken } = require('../utils/jwt.util')


const router = Router()

router.post('/',
    passport.authenticate('login', { failureRedirect: '/api/auth/failed-login'}),
    async (req, res) => {

        try {
        // const {email, password} = req.body

        // const user = await User.findOne({email})

        // if (!user)
        //     return res.status(400).json({message: 'Bad Request'})

        // if (!isValidPassword(user, password))
        //     return res.status(400).json({message: 'Bad Request'})

            req.session.user = {
                id: req.user.id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,  
                email: req.user.email,
                role: req.user.role
            }

            console.log(req.session)

            const token = generateToken({ id: req.user.id, role: req.user.role})

            res.cookie('authToken', token, {
                maxAge: 60000,
                httpOnly: true
            })
            
    res.redirect('/api/products')
    //res.json({status: 'success', message: 'Logeo Exitoso'})
    } catch (error) {
        res.json({error})
    }
    
})

router.post('/logout', (req, res) => {
    console.log('logout')
    req.session.destroy(err => {
      if (err) {
        console.error('error al cerrar sesion', err)
      } else
      res.redirect('/login')
    })
})

router.get('/failed-login', (req, res) => {
    console.log('Inicio fallido')
    return res.status(400).json({ status: 'error', error: 'Bad request' })
})

router.get('github', (req,res) => {
    
})

router.get('githubcallback', (req,res) => {

})
module.exports = router