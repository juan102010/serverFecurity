
const SBRT_Usuario = require('../models/sbrt_usuario');
const SBRT_Rol = require('../models/sbrt_rol');

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
const  existeRol= async( rol = 0 ) => {
    // Verify if the email exists
    const existeRol = await SBRT_Rol.findOne({Ide_Rol: rol }).exec();
    if ( !existeRol ) {
        throw new Error('00024');
    }
}
module.exports = {
    emailExistsLogin,
    emailExists,
    existeRol
}

