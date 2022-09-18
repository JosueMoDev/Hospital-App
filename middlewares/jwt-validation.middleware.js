const { response } = require('express');
const  jwt  = require('jsonwebtoken');

const isJwtValid = (req, resp = response, next) => {
    const token = req.header('x-token');
    console.log(token);
    if (!token) { 
        return resp.status(401).json({
            ok: false,
            message: ' No token was sent by user'
        });
    }
    try {
        const { user_id } = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.user_id = user_id;
        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            message:'Invalid token'
        });
    }
}

module.exports = { isJwtValid }
