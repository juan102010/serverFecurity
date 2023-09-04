
const SBRT_Usuario = require('../models/sbrt_usuario');
const SBRT_Rol = require('../models/sbrt_rol');
const SBRTRolByUser = require('../models/sbrt_rolporusuario');

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
const  notExistemailRolByUser= async( Ide_Usuario = '' ) => {
    // Verify if the email exists
    const existeEmail = await SBRTRolByUser.findOne({Ide_Usuario: Ide_Usuario }).exec();
    if ( !existeEmail ) {
        throw new Error('00025');
    }
}
const  existsemailRolByUser= async( Ide_Usuario = '' ) => {
    // Verify if the email exists
    const existeEmail = await SBRTRolByUser.findOne({Ide_Usuario: Ide_Usuario }).exec();
    if ( existeEmail ) {
        throw new Error('00026');
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
    existeRol,
    notExistemailRolByUser,
    existsemailRolByUser
}

