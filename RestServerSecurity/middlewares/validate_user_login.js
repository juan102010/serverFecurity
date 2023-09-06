const { response, request } = require('express');


//Valid that you are receiving a valid token to be able to eliminate 
const validateLog = async (req = request, res = response, next) => {

    const token = req.header('log-token');
    //No token is registered, the validation is validation.
    if (!token) {
        return res.status(401).json({
            code: '00016',
            msg: 'No token in the request'
        });
    }

    try {

        if (token != '64Sgobue@') {
            return res.status(401).json({
                code: '00019',
                msg: 'Invalid token to check users'
            })
        }

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            code: "00019",
            msg: 'Invalid token'
        })
    }

}




module.exports = {
    validateLog
}