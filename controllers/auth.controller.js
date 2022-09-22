const { response } = require('express');
const User = require('../models/user.model');
const bcryp = require('bcryptjs');

const { JWTGenerated } = require('../helpers/JWT.helpers');
const { googleTokenVerify } = require('../helpers/google-token-verify.helpers');

const login = async (req, resp = response) => { 

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        // checking email
        if (!user) { 
            
            return resp.status(404).json({
                ok: false,
                message:` we couldn't fiend  this user '${email}' into databese`
            });
        }

        // checking Password

        const validatePassword = bcryp.compareSync(password, user.password);

        if (!validatePassword) { 
            return resp.status(404).json({
                ok: false,
                message:'Password not valid'
            });
        }

        // Generate a JWT 
        const token = await JWTGenerated(user.id);

        resp.status(200).json({
            ok: true,
            message: ' Welcome ',
            token
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
        if (!user) {
            user = new User({
                name, 
                email,
                password:'@@@',
                img: picture,
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
module.exports = { login, googleSignIn }