const { response } = require('express');

const SBRTRolByUser = require('../models/sbrt_rolporusuario');


const rolByUserGet = async (req = request, res = response) => {

    const [ rolByUser ] = await Promise.all([
        SBRTRolByUser.find()
    ]);

    res.json({
        rolByUser
    });
}
// Method to search and fetch a user by his Ide_Usuario
const rolGetByIde = async(req, res = response) => {
    //look up the Ide_Usuario to compare it against the database
    const { Ide_Usuario } = req.params;
    

    const rolByUser = await SBRTRolByUser.findOne({Ide_Usuario} );

    res.json(rolByUser);
}

const rolByUsePost = async (req, res = response) => {
 
     const {  Ide_Rol, Ide_Usuario } = req.body;
     const roleByUser = new SBRTRolByUser({Ide_Rol,Ide_Usuario});

    // Guardar en BD
    await roleByUser.save();

    res.json({
        roleByUser
    });
}
//creating a method for updating a record
const rolbyuserPut = async(req, res = response) => {
     //look up the Ide_Usuario to compare it against the database
    const { Ide_Usuario } = req.params;
    
    const resto  = req.body;
  
    const rolbyuser = await SBRTRolByUser.findOneAndUpdate( {Ide_Usuario:Ide_Usuario}, resto );

    res.json(rolbyuser);
}




module.exports = {
    rolByUserGet,
    rolByUsePost,
    rolbyuserPut,
    rolGetByIde
}
