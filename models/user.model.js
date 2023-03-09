const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    document_type: {
        type: String,
        required:true
    },

    document_number: {
        type: String,
        require: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require:true
    },

    name: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require:true,  
    },
    gender: {
        type: String,
        require:true,  
    },
    phone: {
        type: String,
        require:true,  
    },

    validationState: {
        type: Boolean,
        default:true
    },

    photo: {
        type: String,
    },

    photo_id: {
        type: String
    },

    rol: {
        type: String,
        require: true,
    },

    email_provider: {
        type: String,
        required: true,
    }

});

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.user_id = _id;
    return object
});
module.exports = model('User', UserSchema);
