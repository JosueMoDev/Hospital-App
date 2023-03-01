const { Schema, model } = require("mongoose");

const PatientSchema = Schema({
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
        default:'patient'
    },

    google: {
        type: Boolean,
        required: true,
        default: false
    }
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

PatientSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.patient_id = _id;
    return object
});
module.exports = model('Patient', PatientSchema);