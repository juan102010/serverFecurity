
const SBRT_Usuario = require('../models/sbrt_usuario');

const  emailExistsLogin= async( correo = '' ) => {
    // Verify if the email exists
    const existeEmail = await SBRT_Usuario.findOne({Ide_Usuario: correo }).exec();
    if ( !existeEmail ) {
        throw new Error('00020');
    }
}
const  emailExists= async( correo = '' ) => {
    // Verify if the email exists
    const existeEmail = await SBRT_Usuario.findOne({Ide_Usuario: correo }).exec();
    if ( existeEmail ) {
        throw new Error('00008');
    }
}
module.exports = {
    emailExistsLogin,
    emailExists
}

