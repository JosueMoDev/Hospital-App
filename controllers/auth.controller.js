const { response } = require('express');
const User = require('../models/user.model');
const bcryp = require('bcryptjs');

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

        const validatePassword = bcryp.compareSync(password, user.password);

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
        const { name, email, picture } = await googleTokenVerify(req.body.token);
        const userIntoDB = await User.findOne({ email });
        let user;
        if (!userIntoDB) {
            user = new User({
                name, 
                email,
                password:'@@@',
                photo: picture,
                google:true,
                
            })
        } else {
            
            user = userIntoDB;
            user.google= true
        }
        
// save on database
         await user.save();
// generate token
        const token = await JWTGenerated(user.id)
        resp.status(200).json({
            ok: true,
            email, name, picture,token
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