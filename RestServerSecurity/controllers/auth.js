const { response } = require('express');

const SBRTUsuario = require('../models/sbrt_usuario');

const { generateJWT } = require('../helpers/generar-jwt');

//in loginValidation we will verify that:
//Password and email are correct user status 
//if they are we generate a token with the function generateJWT

const loginValidation = async(req, res = response) => {

    const { Ide_Usuario, Nom_Dependencia } = req.body;

    try {
      
        // Verify if the email exists
        const user = await SBRTUsuario.findOne({ Ide_Usuario });

        
        if ( !user ) {
            return res.status(400).json({
                code:'00003',
                msg: 'User / Password are not correct - mail'
            });
        }
        if (Nom_Dependencia != user.Nom_Dependencia ) {
            return res.status(400).json({
                code:'00004',
                msg: 'User / Password are not correct - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.Ide_Usuario,user.Emp_Id );
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
            msg: 'Talk to the administrator'
        });
    }   

}



module.exports = {
    loginValidation
}
