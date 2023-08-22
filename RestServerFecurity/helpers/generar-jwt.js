const jwt = require('jsonwebtoken');



const generarJWT = ( Ide_Usuario = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { Ide_Usuario };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( '00010' )
            } else {
                resolve( token );
            }
        })

    })
}




module.exports = {
    generarJWT
}

