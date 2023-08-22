const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const USU_Usuario = require('../models/usu_usuario');


//creation of a method to fetch all the users from the database
//with the condition that the status is set to True as this means 
//that are active and that have not been deleted

const userGet = async(req = request, res = response) => {
//we give you a paging limit 
    const { limite = 5, desde = 0 } = req.query;
    //check the status of users
    const queryAct = { USU_Activo: true };
    const queryInAct = { USU_Activo: false };
    //generates the body that will return
    const [ total_Act,total_InAct, usuario ] = await Promise.all([
        USU_Usuario.countDocuments(queryAct),
        USU_Usuario.countDocuments(queryInAct),
        USU_Usuario.find(queryAct)
            .skip( Number( desde ) ) 
            .limit(Number( limite ))
    ]);
    //body
    res.json({
        total_Act,
        total_InAct,
        usuario
    });
}

// Method to search and fetch a user by his USU_ID
const userGetById = async(req, res = response) => {
    //look up the usu_Id to compare it against the database
    const { USU_Id } = req.params;
    

    const usuario = await USU_Usuario.findOne({USU_Id} );

    res.json(usuario);
}

//creation of a method to create a new user
//TODO falta implementar el id auto incrementador 
const userPost = async(req, res = response) => {
    
    const {
         USU_Nombres, 
         USU_Email, 
         Nom_Dependencia,
         Ide_Usuario,
         USU_FechaUltimaActualizacion,
         USU_Activo } = req.body;
    const usuario = new USU_Usuario({ 
        USU_Nombres, 
        USU_Email, 
        Nom_Dependencia,
        Ide_Usuario,
        USU_FechaUltimaActualizacion,
        USU_Activo });

   
    // Save to BD
    await usuario.save();

    res.json({
        usuario
    });
}

//creating a method for updating a record
const userPut = async(req, res = response) => {

    const { USU_Id } = req.params;
    const {  Nom_Dependencia, ...resto } = req.body;
  
    const usuario = await USU_Usuario.findOneAndUpdate( {USU_Id:USU_Id}, resto );

    res.json(usuario);
}

//logical deletion of a user
const userDelete = async(req, res = response) => {

    const { USU_Id } = req.params;
    const usuario = await USU_Usuario.findOneAndUpdate( {USU_Id:USU_Id}, { USU_Activo: false } );
 
    res.json(usuario);
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userGetById
    
}