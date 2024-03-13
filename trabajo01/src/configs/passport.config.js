const passport = require('passport')
const local = require('passport-local')
const jwt = require('passport-jwt')
const cookieExtractor = require('../utils/cookie-extractor.util')
const { secretKey } = require('./server.configs')
const GithubStrategy = require('passport-github2')
const { createHash, isValidPassword } = require('../utils/crypt-password.util')
const { GH_Client_ID, GH_Client_Secret} = require('../configs/server.configs')
const { findUser, createUser, findUserByID } = require('../dao/manager/userManager')
const UserDTO = require('../DTO/userDTO')

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
                
                const {first_name, last_name, age, email} = req.body

                const user = await findUser(username)

                if(user) {
                    console.log('Usuario existente')
                    return done(null, false)
                }

                const newUserInfo = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                const newUser = await createUser(newUserInfo)

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
                const user = await findUser(username)

                if (!user) {
                    console.log('No existe')
                    return done(null, false)
                }
            
                if (!isValidPassword(user, password)) {
                    console.log('Contraseña incorrecta')
                    return done(null, false)
                }

                const userDTO = new UserDTO(user)
            
                return done(null, userDTO)

            } catch(error) {
                done(error)
            }

        }))

    // passport.use('github', new GithubStrategy({
    //     clientID: GH_Client_ID,
    //     clientSecret: GH_Client_Secret,
    //     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    // }))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = findUserByID(id)
        done(null, user)
    })

}

module.exports = initializePassport