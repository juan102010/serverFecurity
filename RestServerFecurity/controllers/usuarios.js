const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const USU_Usuario = require('../models/usu_usuario');


//creacion de un metodo para traer todos los usuarios de la base de datos 
//con la condicien de que el estado sea en True ya que esto significa 
//que estan activos y que no han cido borrados 

const userGet = async(req = request, res = response) => {
//le damos un limite de paginado 
    const { limite = 5, desde = 0 } = req.query;
    //revisa el estado de los usuarios
    const queryAct = { USU_Activo: true };
    const queryInAct = { USU_Activo: false };
    //genera el cuerpo que va a devolver
    const [ total_Act,total_InAct, usuario ] = await Promise.all([
        USU_Usuario.countDocuments(queryAct),
        USU_Usuario.countDocuments(queryInAct),
        USU_Usuario.find(queryAct)
            .skip( Number( desde ) ) 
            .limit(Number( limite ))
    ]);
    //cuerpo
    res.json({
        total_Act,
        total_InAct,
        usuario
    });
}

//creacion de un metodo para traer todos los usuarios de la base de datos 
//pero por el id de la base de datos 
const userGetById = async(req, res = response) => {
    //busca el usu_Id para compararlo contra la base de datos
    const { USU_Id } = req.params;
    

    const usuario = await USU_Usuario.findOne({USU_Id} );

    res.json(usuario);
}

//creacion de un metodo para crear un usuario nuevo 
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

   
    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

//creacion de un metodo para actualizar un registro 
const userPut = async(req, res = response) => {

    const { USU_Id } = req.params;
    const {  Nom_Dependencia, ...resto } = req.body;
  
    const usuario = await USU_Usuario.findOneAndUpdate( {USU_Id:USU_Id}, resto );

    res.json(usuario);
}


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