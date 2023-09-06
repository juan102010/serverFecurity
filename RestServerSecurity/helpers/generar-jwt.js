const jwt = require('jsonwebtoken');



const generateJWT = (Ide_Usuario = '', Emp_Id = 0,Esquema='',Role=0) => {

    return new Promise((resolve, reject) => {

        const payload = { Ide_Usuario, Emp_Id,Esquema,Role };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('00010')
            } else {
                resolve(token);
            }
        })

    })
}




module.exports = {
    generateJWT
}

