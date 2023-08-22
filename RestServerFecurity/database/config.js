const mongoose = require('mongoose');



const dbConnectionFec = async() => {

    try {

        await mongoose.connect( process.env.MONGODBFEC_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('We are connected to the Fecurity database.');

    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the Fecurity database');
    }


}

module.exports = {
    dbConnectionFec,
    
}
