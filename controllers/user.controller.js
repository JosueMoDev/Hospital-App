const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const { response } = require('express');
const { JWTGenerated } = require('../helpers/JWT.helpers');

const getUsers = async (req, resp = response) => { 
    
    const pagination = Number(req.query.pagination) || 0;
    const [users, total] = await Promise.all([

        User
            .find()
            .skip(pagination)
            .limit(5),
        
        User.count()

    ]);
   
    resp.json({
        ok: true,
        message:'getting users ....',
        users,
        total
    })
}

const createUser = async (req, resp) => { 
    
    
    const {  email, document_number, document_type, email_provider, rol } = req.body;

    try {
        const isPathAvailable = ['doctor', 'operator'];
        //  validate if one those folders are avilable on claudinary
        if (!isPathAvailable.includes(rol)) {    
            return resp.status(403).json({
                ok: false,
                message: 'forbidden action',
                
            });
        }
        const isEmailTaken = await User.findOne({ email });
        if (isEmailTaken) { 
            return resp.status(400).json({
                ok: false,
                message: 'This mail has already taken'
            });
        }

        const isPreviuslyRegister = await User.findOne({ document_number });
        if (isPreviuslyRegister) { 
            return resp.status(400).json({
                ok: false,
                message: `This user already has an account with document ${document_type}:${document_number}`
            });
        }
        const user = new User(req.body);
     // encrypt password{
        if(email_provider==='@gmail.com'){user.google=true}
        const password = 'the clinic'
        const encrypting = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, encrypting);
    // here create our users    
        await user.save();

    
    // Generate a JWT 
        const token = await JWTGenerated(user.id);

        resp.json({
            ok: true,
            message: 'user has been created success',
            user,
            token
        });
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message: 'unexpercted error'
        });
    }




}
const updateUser = async (req, resp) => {
    
    const user_id = req.params.id;
    try {
        //Database users
        const user = await User.findById(user_id);
        if (!user) { 
            return resp.status(404).json({
                ok: false,
                message: 'unknown user at database'
            })
        } 
   
        // Updating user
        const { password, google, email, ...fields } = req.body;

        if (user.email !== email) { 
            const isEmailTaken = await User.findOne({ email });
            if (isEmailTaken) { 
                return resp.status(400).json({
                    ok: false,
                    message: 'This mail has been already taken'
                });
            }
            fields.email = email;
        }


        const userUpdated = await User.findByIdAndUpdate(user_id, fields,{ new:true})
 
        resp.json({
            ok: true,
            massage:'data has been updated success',
            user: userUpdated
        })
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'unexpected error'
        })
    }
}

const deleteUser = async (req, resp) => {
    const user_id = req.params.id;    
    try {
        const user = await User.findById(user_id);
        if (!user) { 
            return resp.status(404).json({
                ok: false,
                message: `unknown user '${user_id}' at database`
            })
        } 
        if (user.role === 'ADMIN_ROLE') { 

            // await User.findByIdAndDelete(user.id);
            return resp.status(200).json({
                 ok: true,
                 massage:'user has been deleted success',
                 user_id
             }) 
        }
        resp.status(400).json({
            ok: true,
            massage:'to delete user you must be admin',
            user_id
        }) 

    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'We could perform this action'
        });
    }
  
}
module.exports = { getUsers, createUser, updateUser, deleteUser };