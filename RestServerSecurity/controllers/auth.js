const { response } = require('express');
const bcryptjs = require('bcryptjs')

const SBRTUsuario = require('../models/sbrt_usuario');

const { generarJWT } = require('../helpers/generar-jwt');

//en loginValidation vamos a verificar que:
//el Password y correo sean correctos estado del usuario 
//si lo son generamos un token con la funcion generarJWT 

const loginValidation = async(req, res = response) => {

    const { Ide_Usuario, Nom_Dependencia } = req.body;

    try {
      
        // Verificar si el email existe
        const user = await SBRTUsuario.findOne({ Ide_Usuario });

        
        if ( !user ) {
            return res.status(400).json({
                code:'00003',
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        if (Nom_Dependencia != user.Nom_Dependencia ) {
            return res.status(400).json({
                code:'00004',
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.Ide_Usuario );
        //JSON que se va a devolver
        res.json({
            user,
            token,
        }) 

    } catch (error) {
        //error si se genera algun error 
        console.log(error)
        res.status(500).json({
            code:'00006',
            msg: 'Hable con el administrador'
        });
    }   

}



module.exports = {
    loginValidation
}
