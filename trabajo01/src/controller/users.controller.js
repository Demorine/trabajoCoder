const {Router} = require('express')
const User = require('../dao/models/user.model')


const router = Router()

router.post('/', async (req, res) => {

    try {
        const {first_name, last_name, email, password} = req.body

        const newUserInfo = {
            first_name,
            last_name,
            email,
            password
        }

        const user = await User.create(newUserInfo)

    //res.json({status: 'success', message: user})
    res.redirect('/login')
    } catch (error) {
        res.json({error})
    }

})

module.exports = router