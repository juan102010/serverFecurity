
const USU_Usuario = require('../models/usu_usuario');



const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await USU_Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error('00008');
    }
}

const existeUsuarioPorId = async( USU_Id=0 ) => {

    // Verificar si el id existe
    const existeUsuario = await USU_Usuario.findOne({USU_Id});
    if ( !existeUsuario ) {
        throw new Error('00009');
    }
}



module.exports = {
    emailExiste,
    existeUsuarioPorId
}

