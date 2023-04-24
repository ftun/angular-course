const { Schema, model } = require('mongoose');

// como se va a guardar en la tabal en bds
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    },
});

/**
 * Para tratar los datos a retornar en el modelo
 */
UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object }  = this.toObject();
    object.uid = _id;
    return object
})

module.exports = model('User', UserSchema);