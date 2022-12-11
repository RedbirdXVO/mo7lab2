const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (request, response, next) => {
    const token = request.cookies.jwt

    if(token){
        jwt.verify(token, 'aaron varga secret', (error, decodedToken) => {
            if (error) {
                console.log(err.message)
                response.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        response.redirect('/login')
    }
}

const checkUser = (request, response, next) => {
    const token = request.cookies.jwt
    if(token){
        jwt.verify(token, 'aaron varga secret', async (error, decodedToken) => {
            if (error) {
                console.log(err.message)
                response.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                response.locals.user = user;
                next()
            }
        })
    } else {
        response.locals.user = null
        next();
    }
}

module.exports = {requireAuth, checkUser}