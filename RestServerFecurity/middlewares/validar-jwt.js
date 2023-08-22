const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usu_usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            code:'00016',
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { Ide_Usuario } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findOne( {Ide_Usuario} );

        if( !usuario ) {
            return res.status(401).json({
                code:'00017',
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // // Verificar si el uid tiene estado true
        // if ( !usuario.estado ) {
        //     return res.status(401).json({
        //         code:'00018',
        //         msg: 'Token no válido - usuario con estado: false'
        //     })
        // }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            code:"00019",
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}