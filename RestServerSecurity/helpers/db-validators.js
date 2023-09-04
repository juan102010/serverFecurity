const { User,RolByUser,Role,CompanyReport,Application } = require('../models');

const  emailExistsLogin= async( correo = '' ) => {
    // Verify if the email exists
    const existeEmail = await User.findOne({Ide_Usuario: correo }).exec();
    if ( !existeEmail ) {
        throw new Error('00020');
    }
}
const  emailExists= async( correo = '' ) => {
    // Verify if the email exists
    const existeEmail = await User.findOne({Ide_Usuario: correo }).exec();
    if ( existeEmail ) {
        throw new Error('00008');
    }
}
const  notExistemailRolByUser= async( Ide_Usuario = '' ) => {
    // Verify if the email exists
    const existeEmail = await RolByUser.findOne({Ide_Usuario: Ide_Usuario }).exec();
    if ( !existeEmail ) {
        throw new Error('00025');
    }
}
const  existsemailRolByUser= async( Ide_Usuario = '' ) => {
    // Verify if the email exists
    const existeEmail = await RolByUser.findOne({Ide_Usuario: Ide_Usuario }).exec();
    if ( existeEmail ) {
        throw new Error('00026');
    }
}
const  existeRol= async( rol = 0 ) => {
    // Verify if the email exists
    const existeRol = await Role.findOne({Ide_Rol: rol }).exec();
    if ( !existeRol ) {
        throw new Error('00024');
    }
}
const  notExistIdReport= async( Ere_Id = 0 ) => {
    // Verify if the email exists
    const existIdReport = await CompanyReport.findOne({Ere_Id: Ere_Id }).exec();
    if ( !existIdReport ) {
        throw new Error('00027');
    }
}
const  notExistIdApplication= async( Ide_Aplicacion = 0 ) => {
    // Verify if the email exists
    const existIdApplication = await Application.findOne({Ide_Aplicacion: Ide_Aplicacion }).exec();
    if ( !existIdApplication ) {
        throw new Error('00028');
    }
}
module.exports = {
    emailExistsLogin,
    emailExists,
    existeRol,
    notExistemailRolByUser,
    existsemailRolByUser,
    notExistIdReport,
    notExistIdApplication
}

