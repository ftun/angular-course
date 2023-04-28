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
    try {
        const { id } = req.params;

        const existDoctor = await ModelDoctor.findById(id);
        if (!existDoctor) {
            return res.status(404).json({
                ok: false,
                message: 'Doctor not exist!',
            });
        }

        const Doctor = await ModelDoctor.findByIdAndUpdate(id, { ...req.body, user: req.uid }, { new: true });
        return res.json({
            ok: true,
            Doctor
        })

    } catch (error) {
        console.error('updateDoctors', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const deleteDoctors = async (req, res = response) => {
    try {
        const { id } = req.params;

        const existDoctor = await ModelDoctor.findById(id);
        if (!existDoctor) {
            return res.status(404).json({
                ok: false,
                message: 'Doctor not exist!',
            });
        }

        await ModelDoctor.findByIdAndDelete(id, { new: true });
        return res.json({
            ok: true,
            uid: id,
        });
    } catch (error) {
        console.log('deleteDoctors', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors,
}