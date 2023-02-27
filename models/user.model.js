const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    user_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require:true,  
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
    validationState: {
        type: Boolean,
        default:false
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
    google: {
        type: Boolean,
        required: true,
        default: false
    }

});

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object
});
module.exports = model('User', UserSchema);
