const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { updateImage } = require('../helpers/updateImage');
const { fstat } = require('fs');

const collectionValid = [
    'users',
    'hospitals',
    'doctors',
];

const extensionValid = ['png', 'jpg', 'jpeg', 'gif'];

const uploadFile = async (req, res = response) => {

    const { collection, id } = req.params;

    if (!collectionValid.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msn: 'Collection not valid',
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msn: 'No files were uploaded.'
        });
    }

    const { image } = req.files;
    const name = image.name.split('.');
    const ext = name[name.length - 1];

    if (!extensionValid.includes(ext)) {
        return res.status(400).json({
            ok: false,
            msn: 'Extension file not valid'
        });
    }

    const filename = `${uuidv4()}.${ext}`;
    const path = `./uploads/${collection}/${filename}`;

    image.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msn: err.message
            });
        }

        updateImage({ collection, id, filename});
        return res.json({
            ok: true,
            filename,
        });
    });
};

const getFiles = (req, res = response) => {
    const { collection, id } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${collection}/${id}`);

    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
    }

    const pathNotImg = path.join(__dirname, `../uploads/not-image.png`);
    return res.sendFile(pathNotImg);
}

module.exports = {
    uploadFile,
    getFiles
}