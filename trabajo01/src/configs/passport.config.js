const passport = require('passport')
const local = require('passport-local')
const jwt = require('passport-jwt')
const cookieExtractor = require('../utils/cookie-extractor.util')
const { secretKey } = require('./server.configs')
const User = require('../dao/models/user.model')
const { createHash, isValidPassword } = require('../utils/crypt-password.util')

const JWTStrategy = jwt.Strategy

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey
    }, (jwt_payload, done) => {
        try {
            done(null, jwt_payload)
        } catch(error) {
            done(error)
        }
    }))

    passport.use('register',
        new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {

            try {
                
                const {first_name, last_name, email} = req.body
                const user = await User.findOne({email: username})

                if(user) {
                    console.log('Usuario existente')
                    return done(null, false)
                }

                const newUserInfo = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }

                const newUser = await User.create(newUserInfo)

                return done(null, newUser)

                } catch(error) {
                    return done(error)
            }
        }
    ))

    passport.use('login',
        new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {

            try {
                const user = await User.findOne({ email: username})

                if (!user) {
                    console.log('No existe')
                    return done(null, false)
                }
            
                if (!isValidPassword(user, password)) {
                    console.log('Contraseña incorrecta')
                    return done(null, false)
                }
            
                return done(null, user)

            } catch(error) {
                done(error)
            }

        }))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = User.findOne({_id: id})
        done(null, user)
    })

}

module.exports = initializePassport