const {Router} = require('express')
const User = require('../dao/models/user.model')


const router = Router()

router.post('/', async (req, res) => {

    try {
        const {email, password} = req.body

        const user = await User.find({email})

        if (!user)
            return res.status(400).json({message: 'Bad Request'})

        if (user.password !== password)
            return res.status(400).json({message: 'Bad Request'})

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
    }

    res.json({status: 'success', message: 'Logeo Exitoso'})
    } catch (error) {
        res.json({error})
    }
    



})

module.exports = router