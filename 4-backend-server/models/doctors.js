const { Schema, model } = require('mongoose');

// como se va a guardar en la tabal en bds
const DoctorSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId, // indica a mongo que hay una relacion
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId, // indica a mongo que hay una relacion
        ref: 'Hospital',
        required: true
    },
});

/**
 * Para tratar los datos a retornar en el modelo
 */
DoctorSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object
})

module.exports = model('Doctor', DoctorSchema);