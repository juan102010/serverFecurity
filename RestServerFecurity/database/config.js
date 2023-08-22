const mongoose = require('mongoose');



const dbConnectionFec = async() => {

    try {

        await mongoose.connect( process.env.MONGODBFEC_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Estamos conectados a la base de datos de Fecurity');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos de Fecurity');
    }


}
const dbConnectionSec = async() => {

    try {

        await mongoose.connect( process.env.MONGODBSEC_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Estamos conectados a la base de datos de Security');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos de Security');
    }


}



module.exports = {
    dbConnectionFec,
    dbConnectionSec
}
