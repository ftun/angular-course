const { response } = require('express');
const ModelDoctor = require('../models/doctors');

const getDoctors = async (req, res = response) => {
    const Doctors = await ModelDoctor.find()
        .populate('user', "name img") // atributo-relacion, 'atributos-modelo-separado-por-espacios
        .populate('hospital', "name img") // atributo-relacion, 'atributos-modelo-separado-por-espacios
        ;

    return res.json({
        ok: true,
        Doctors
    })
};

const createDoctors = async (req, res = response) => {
    try {
        const uid = req.uid;
        const Doctor = new ModelDoctor({ ...req.body, user: uid });
        await Doctor.save();

        return res.json({
            ok: true,
            Doctor
        });
    } catch (error) {
        console.error('createDoctors', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const updateDoctors = async (req, res = response) => {
    return res.json({
        ok: true,
        msn: 'Doctors'
    })
};

const deleteDoctors = async (req, res = response) => {
    return res.json({
        ok: true,
        msn: 'Doctors'
    })
};

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors,
}