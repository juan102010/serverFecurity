
const USU_Usuario = require('../models/usu_usuario');



const  emailExists= async( correo = '' ) => {

    // Verify if the email exists
    const existeEmail = await USU_Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error('00008');
    }
}

const existsUserById = async( USU_Id=0 ) => {

    // Check if the id exists
    const existeUsuario = await USU_Usuario.findOne({USU_Id});
    if ( !existeUsuario ) {
        throw new Error('00009');
    }
}



module.exports = {
    emailExists,
    existsUserById
}

