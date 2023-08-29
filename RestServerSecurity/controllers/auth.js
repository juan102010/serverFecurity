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
const usersLoginGet = async(req = request, res = response) => {
    //we give you a paging limit 
        const { limite = 5, desde = 0 } = req.query;
      
        //generates the body that will return
        const [ users ] = await Promise.all([

            SBRTUsuario.find()
                .skip( Number( desde ) ) 
                .limit(Number( limite ))
        ]);
        //body
        res.json({
            users
        });
    }
//creation of a method to create a new user

const userLoginPost = async(req, res = response) => {
    const {
        Ide_Usuario, 
        Nom_Dependencia, 
        Emp_Id
         } = req.body;
    const userLog = new SBRTUsuario({ 
        Ide_Usuario, 
        Nom_Dependencia, 
        Emp_Id });

   
    // Save to BD
    await userLog.save();

    res.json({
        userLog
    });
}

//creating a method for updating a record
const userLoginPut = async(req, res = response) => {

    
    const {  Ide_Usuario,Emp_Id,...resto } = req.body;
  
    const usuario = await SBRTUsuario.findOneAndUpdate( {Ide_Usuario:Ide_Usuario}, resto );

    res.json(usuario);
}

module.exports = {
    loginValidation, 
    usersLoginGet,
    userLoginPut,
    userLoginPost
}
