const { response } = require('express');
const User = require('../models/user.model');
const bcryp = require('bcryptjs');

const { JWTGenerated } = require('../helpers/JWT.helpers')

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
module.exports = {login}