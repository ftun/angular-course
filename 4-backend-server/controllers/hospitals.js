const { response } = require('express');

const ModelHospital = require('../models/hospitals');

const getHospitals = async (req, res = response) => {
    const Hospitals = await ModelHospital.find()
                        .populate('user', "name img") // atributo-relacion, 'atributos-modelo-separado-por-espacios
                        ;

    return res.json({
        ok: true,
        Hospitals
    })
};

const createHospitals = async (req, res = response) => {
    try {
        const uid = req.uid;
        const Hospital = new ModelHospital({...req.body, user: uid});
        await Hospital.save();

        return res.json({
            ok: true,
            Hospital
        })
    } catch (error) {
        console.error('createHospitals', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const updateHospitals = async (req, res = response) => {
    return res.json({
        ok: true,
        msn: 'Hospitals'
    })
};

const deleteHospitals = async (req, res = response) => {
    return res.json({
        ok: true,
        msn: 'Hospitals'
    })
};

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals,
}