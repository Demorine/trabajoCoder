const {Router} = require('express')
const { isEmptyObject } = require('jquery')
const router = Router()

router.get('/', (req, res) => {
    res.render('chat.handlebars')
})


module.exports = router