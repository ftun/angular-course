const { response } = require('express');
const bcrypt = require('bcryptjs');
const ModelUser = require('../models/users');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const User = await ModelUser.findOne({ email: email });
        if (!User) {
            return res.status(400).json({
                ok: false,
                msn: '001 Something wrong!'
            });
        };

        const validPassword = bcrypt.compareSync(password, User.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msn: '002 Something wrong!'
            });
        }

        const token = await generateJWT({ uid: User.id });
        return res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.error('login', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Error inesperado... revisar logs'
        });
    }
};

const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const existUser = await ModelUser.findOne({ email: email });
        let User = null;
        if (!existUser) {
            User = new ModelUser({
                name, email, password: '@@@', img: picture, google: true
            })
        } else {
            User = existUser;
            User.google = true;
        }

        await User.save();
        const token = await generateJWT({ uid: User.id });

        return res.json({
            ok: true,
            email, name, picture, token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msn: error.message
        });
    }
};

module.exports = {
    login,
    googleSignIn,
}