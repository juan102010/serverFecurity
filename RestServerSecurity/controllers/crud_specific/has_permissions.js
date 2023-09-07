const { response } = require('express');
const jwt = require('jsonwebtoken');
const { User, RolByUser, FunctionalityByRole, Functionality } = require('../../models');

//this code appears to be a route handler to validate whether a user has permission to access
//a specific functionality based on their role and the JWT token provided in the request header.
//It returns a boolean value indicating the permission status.
const functionalityValidation = async (req, res = response) => {
    const { Des_DescripcionFuncionalidad } = req.body;
    const token = req.header('x-token');
    //No token is registered, the validation is validation.
    if (!token) {
        return res.status(401).json({
            code: '00016',
            msg: 'No token in the request'
        });
    }

    try {
        const { Ide_Usuario } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //Search for the user 
        const user = await User.findOne({ Ide_Usuario });

        //Verify if the email exists
        if (!user) {
            return res.status(400).json({
                code: '00003',
                msg: 'User / Password are not correct - mail'
            });
        }

        //Search for the user's role 
        const rolByUser = await RolByUser.findOne({ Ide_Usuario: user.Ide_Usuario });
        //Search for the functionality of the user's role 
        const functionalityByRole = await FunctionalityByRole.find({ Ide_Rol: rolByUser.Ide_Rol });
        //you get a new array containing all the values of
        //Ide_Functionality extracted from the objects in functionalityByRole.
        const functionalityIds = functionalityByRole.map(role => role.Ide_Funcionalidad);
        //searches for documents in the Functionality
        //collection where the value of Ide_Functionality is contained in the functionalityIds array.
        const functionalities = await Functionality.find({ Ide_Funcionalidad: { $in: functionalityIds } });
        // verificar si al menos un elemento en el arreglo functionalities
        //cumple con la condición especificada en la función de prueba (callback).
        //Aquí tienes una explicación detallada
        const result = functionalities.some(func => func.Des_DescripcionFuncionalidad === Des_DescripcionFuncionalidad);

        res.json({ result });

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            code: '00006',
            msg: 'Talk to the administrator'
        });
    }

}



module.exports = {
    functionalityValidation,
}
