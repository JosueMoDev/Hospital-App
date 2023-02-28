const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const { JWTGenerated } = require('../helpers/JWT.helpers');
const { googleTokenVerify } = require('../helpers/google-token-verify.helpers');
const { getMenuFrontEnd } = require('../helpers/menu-frontend.helpers');

const login = async (req, resp = response) => { 

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        // checking email
        if (!user) { 
            
            return resp.status(400).json({
                ok: false,
                message:'You must check your credentials'
            });
        }

        // checking Password

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) { 
            return resp.status(400).json({
                ok: false,
                message:'You must check your credentials'
            });
        }

        // Generate a JWT 
        const token = await JWTGenerated(user.id, user.role);
        const menu = getMenuFrontEnd(user.role)

        resp.status(200).json({
            ok: true,
            message: ' Welcome ',
            token,
            menu
        });

    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Unexpected action, you must communicate to admin'
        });
    }
}
const googleSignIn = async (req, resp = response) => {
    try {
  
        const { email } = await googleTokenVerify(req.body.token);
        const userIntoDB = await User.findOne({ email });

        if (!userIntoDB) {
            console.log( 'user forbidden')
           return resp.status(403).json({
                ok: false,
                message:' User Forbidden'
            });
        }

        const token = await JWTGenerated(userIntoDB.id)

        resp.status(200).json({
            ok: true,
            token, userIntoDB
        });

    } catch (error) {
        resp.status(400).json({
            ok: false,
            message:"google identity veryfy: Token error"
        });
    }
}

const renewToken = async (req, resp = response) => { 
    const user_id = req.user_id
    const token = await JWTGenerated(user_id);
    const user = await User.findById(user_id);

    const menu = getMenuFrontEnd(user.role);
    
    resp.status(200).json({
        ok: true,
        message: "this is your new token",
        token,
        user,
        menu

    });
}
module.exports = { login, googleSignIn, renewToken }