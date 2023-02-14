const { Schema, model } = require("mongoose");

const PatientSchema = Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    photo: {
        type: String
    },
    photo_id: {
        type: String
    },
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

PatientSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.patient_id = _id;
    return object
});
module.exports = model('Patient', PatientSchema);