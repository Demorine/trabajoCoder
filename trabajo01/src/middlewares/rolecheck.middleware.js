

const checkAdminRole = (req, res, next) => {

    if (req.user.role === 'admin') {

        res.locals.isAdmin = true

    } else {

        res.locals.isAdmin = false

    }

    next()

}

module.exports = { checkAdminRole }