const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const SBRT_Usuario = require('../models/sbrt_usuario');

//Valid that you are receiving a valid token to be able to eliminate 
const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    //No token is registered, the validation is validation.
    if ( !token ) {
        return res.status(401).json({
            code:'00016',
            msg: 'No token in the request'
        });
    }

    try {
        
        const { Ide_Usuario } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // read the user corresponding to the uid
        const user = await SBRT_Usuario.findOne( {Ide_Usuario} );

        if( !user ) {
            return res.status(401).json({
                code:'00017',
                msg: 'Invalid token - user does not exist DB'
            })
        }

       
        
        
        req.usuario = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            code:"00019",
            msg: 'Invalid token'
        })
    }

}




module.exports = {
    validateJWT
}