const {Router} = require('express')
const { isEmptyObject } = require('jquery')
const Message = require('../dao/models/message.model')
const router = Router()

router.get('/', (req, res) => {
    res.render('chat.handlebars')
})


module.exports = router