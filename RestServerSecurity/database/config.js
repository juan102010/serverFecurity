const mongoose = require('mongoose');

//It generates the connection to the database
//we want to enter by means of the parameter MONGODBSEC_CNN
//located in the environment variables 
const dbConnectionSec = async () => {

    try {

        await mongoose.connect(process.env.MONGODBSEC_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('We are connected to the Security');

    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the Security database');
    }


}


module.exports = {

    dbConnectionSec
}
