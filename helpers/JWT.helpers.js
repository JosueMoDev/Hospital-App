const  jwt = require('jsonwebtoken');


const JWTGenerated = (user_id) => { 

    return new Promise(( resolve, reject) => { 
        const payload = {
            user_id,
        };
        jwt.sign(payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '12h'
        }, (error, token )=> { 
            if (error) { 
                reject('We could not geneted a token');
            } { 
                resolve(token);
            }
        });
    });    

}

module.exports = {JWTGenerated}