const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
    name: {
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
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

HospitalSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.hospital_id = _id;
    return object
});
module.exports = model('Hospital', HospitalSchema);
