const { Schema, model } = require('mongoose');

// como se va a guardar en la tabal en bds
const HospitalSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId, // indica a mongo que hay una relacion
        ref: 'User',
    },
});

/**
 * Para tratar los datos a retornar en el modelo
 */
HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object
})

module.exports = model('Hospital', HospitalSchema);