const mongoose = require('mongoose');

// mongodb+srv://mean_user:K6UJ2CYRJTauHqZT@cluster0.nku7uom.mongodb.net/angular-course
// mean_user
// K6UJ2CYRJTauHqZT
const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.BDS_STRING_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('BD online!')
    } catch (error) {
        console.log('error:mongo', error);
        throw new Error('Error in connec database')
    }
};


module.exports = {
    dbConnection
};