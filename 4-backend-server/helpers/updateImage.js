const fs = require('fs');
const ModelUser = require('../models/users');
const ModelDoctor = require('../models/doctors');
const ModelHospital = require('../models/hospitals');

const modelCollections = {
    users: ModelUser,
    hospitals: ModelHospital,
    doctors: ModelDoctor,
};

const updateImage = async ({ collection, id, filename }) => {

    if (modelCollections.hasOwnProperty(collection)) {
        const model = await modelCollections[collection].findById(id);
        if (!model) {
            console.log('model not valid');
            return false;
        }
        
        const oldPath =  `./uploads/${collection}/${model.img}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        model.img = filename;
        await model.save();
        return true;
    }
};

module.exports = {
    updateImage,
}