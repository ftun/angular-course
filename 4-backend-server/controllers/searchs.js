const { response } = require('express');
const ModelUser = require('../models/users');
const ModelDoctor = require('../models/doctors');
const ModelHospital = require('../models/hospitals');

const getSearchAll = async (req, res = response) => {
    const { criteria } = req.params;

    const regex = new RegExp(criteria, 'i'); // sensible mayus y minus
    const [Users, Doctors, Hospitals] = await Promise.all([
        ModelUser.find({ name: regex }),
        ModelDoctor.find({ name: regex }),
        ModelHospital.find({ name: regex }),
    ]);

    return res.json({
        ok: true,
        Users,
        Doctors,
        Hospitals
    })
};

const getDocumentsByCollection = async (req, res = response) => {
    const { table, criteria } = req.params;
    const regex = new RegExp(criteria, 'i'); // sensible mayus y minus

    const collections = {
        users: async () => await ModelUser.find({ name: regex }),
        hospitals: async () => await ModelHospital.find({ name: regex }).populate('user', "name img"),
        doctors: async () => await ModelDoctor.find({ name: regex }).populate('user', "name img").populate('hospital', "name img"),
    };

    if (collections.hasOwnProperty(table)) {
        const data = await collections[table]();
        return res.json({
            ok: true,
            data
        });
    }

    return res.status(400).json({
        ok: false,
        msn: 'Not exist collection: ' + table
    });
};


module.exports = {
    getSearchAll,
    getDocumentsByCollection,
}