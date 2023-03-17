const { Schema, model } = require("mongoose");

const ClinicSchema = Schema({
    
    register_number: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require:true
    },
    country: {
        type: String,
    },
   
    province: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    validationState: {
        type: Boolean,
        default:true
    },
    photo: {
        type: String
    },
    photo_id: {
      type: String  
    },
    
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

ClinicSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.clinic_id = _id;
    return object
});
module.exports = model('Clinic', ClinicSchema);
