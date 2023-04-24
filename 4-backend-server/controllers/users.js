const { response } = require('express');
const bcrypt = require('bcryptjs');
const ModelUser = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
    // Se filtra los atributos a retornar en el segundo argumento
    const Users = await ModelUser.find({}, 'name email role google');

    res.json({
        ok: true,
        Users
    })
};

const createUsers = async (req, res = response) => {
    try {
        const { body } = req;
        const existEmail = await ModelUser.findOne({ email: body.email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msn: 'Ya existe el correo registrado'
            });
        };

        const User = new ModelUser(body);
        // encryp pass
        const salt = bcrypt.genSaltSync();
        User.password = bcrypt.hashSync(body.password, salt);
        await User.save();
        const token = await generateJWT({ uid: User.id });

        return res.json({
            ok: true,
            User,
            token
        });
    } catch (error) {
        console.error('createUsers', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const updateUsers = async (req, res = response) => {
    // TODO: Validar Tocken y si es usuario valido
    try {
        const { id } = req.params;

        const existUser = await ModelUser.findById(id);
        if (!existUser) {
            return res.status(404).json({
                ok: false,
                message: 'User not exist!',
            });
        }

        // Para remover atributos de body
        const { password, google, email, ...body } = req.body;
        if (existUser.email !== email) {
            body.email = email;
            const existEmail = await ModelUser.findOne({ email: email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msn: 'User email exist',
                })
            }
        }

        const User = await ModelUser.findByIdAndUpdate(id, body, { new: true });

        return res.json({
            ok: true,
            msn: User,
        })
    } catch (error) {
        console.log('updateUsers', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const deleteUsers = async (req, res = response) => {
    try {
        const { id } = req.params;

        const existUser = await ModelUser.findById(id);
        if (!existUser) {
            return res.status(404).json({
                ok: false,
                message: 'User not exist!',
            });
        }

        await ModelUser.findByIdAndDelete(id, { new: true });
        return res.json({
            ok: true,
            uid: id,
        });
    } catch (error) {
        console.log('deleteUser', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};


module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
}