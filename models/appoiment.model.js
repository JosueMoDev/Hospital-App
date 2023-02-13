const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
    id: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
   
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    },
    patient: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },

    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    //if you want to change the plural name in spanish you can use { collection : 'Plural_Name_Collection'}

});

AppointmentSchema.method('toJSON', function () {
    const { __v, _id,  ...object } = this.toObject();
    object.appointment_id = _id;
    return object
});
module.exports = model('Appointment', AppointmentSchema);