const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const { response } = require('express');
const { JWTGenerated } = require('../helpers/JWT.helpers');

const getUsers = async (req, resp = response) => {
    
    try {
        const pagination = Number(req.query.pagination) || 0;
        const [users, total] = await Promise.all([

            User
                .find()
                .skip(pagination)
                .limit(5),
                // .populate('user','id'),
            
            User.count()

        ]);
    
        resp.json({
            ok: true,
            message:'Getting Users ....',
            users,
            total
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Users'
        });
    }
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
        user.email_provider = email_provider
        const password = 'the clinic'
        const encrypting = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, encrypting);
        user.photo = '';
    // here create our users    
        await user.save();

    
    // Generate a JWT 
        const token = await JWTGenerated(user.id);

       return resp.json({
            ok: true,
            message: 'user has been created success',
            user,
            token
        });
        
    } catch (error) {
       return resp.status(500).json({
            ok: false,
            message: 'unexpercted error'
        });
    }




}
const updateUser = async (req, resp) => {
    
    const id = req.params.id;
    try {
        //Database users
        const user = await User.findById(id);
        if (!user) { 
            return resp.status(404).json({
                ok: false,
                message: 'unknown user at database'
            })
        } 
   
        // Updating user
        const { email, document_number, ...fields } = req.body;

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
        if (user.document_number !== document_number) { 
            const isDocumentExitent = await User.findOne({ email });
            if (isDocumentExitent) { 
                return resp.status(400).json({
                    ok: false,
                    message: `There is somebody already enrrolled with document:  ${user.document_number}`
                });
            }
            fields.document_number = document_number;
        }


        const userUpdated = await User.findByIdAndUpdate(id, fields,{ new:true})
 
        return resp.status(200).json({
            ok: true,
            message:` ${user.rol} has been updated success`,
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
    const user_logged_id = req.body.user_logged
    try {
        const user_to_delete = await User.findById(user_id);
        const user_logged = await User.findById(user_logged_id);
        
        if (!user_to_delete) { 
            return resp.status(404).json({
                ok: false,
                message: `unknown user '${user_id}' at database`
            })
        }
        
        if (user_logged.rol ==='doctor'|| user_logged.rol === 'patient') { 
            return resp.status(404).json({
                ok: false,
                message: `Forbidden action`
            })
        } 
        if (user_to_delete.rol === 'admin') { 
            return resp.status(404).json({
                ok: false,
                message: `Forbidden action`
            })
        
        }
        if (user_logged.id === user_to_delete.id) {
            return resp.status(404).json({
                ok: false,
                message: `Forbidden action`
            })
        } 
        
        user_to_delete.validationState = !user_to_delete.validationState;
        const user_updated = await User.findByIdAndUpdate(user_id, user_to_delete,{ new:true});
 
        return resp.status(200).json({
            ok: true,
            message:`${user_updated.rol } has been ${ (user_updated.validationState)?'Anabled':'Disabled'}`,
        })
      

    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'We could perform this action'
        });
    }
  
}
module.exports = { getUsers, createUser, updateUser, deleteUser };