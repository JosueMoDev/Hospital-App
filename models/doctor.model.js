const { Schema, model } = require("mongoose");

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    photo: {
        type: String
    },
    photo_id: {
        type: String
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require:true
        
    },
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

DoctorSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.doctor_id = _id;
    return object
});
module.exports = model('Doctor', DoctorSchema);