const { response } = require('express');

const SBRTFunctionality = require('../models/sbrt_funcionalidad');

//Function to obtain all the functionalities registered in the database
const functionalityGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [functionality] = await Promise.all([

        SBRTFunctionality.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        functionality
    });
}
//Function to create functionalities in the database
const functionalityPost = async (req, res = response) => {

    const [functionality] = await Promise.all([
        SBRTFunctionality.find()
    ]);
    const orderedResults = functionality.sort((a, b) => {
        return Number.parseInt(b.Ide_Funcionalidad) - Number.parseInt(a.Ide_Funcionalidad)
    })

    const Id = orderedResults[0].Ide_Funcionalidad;
    const Ide_Funcionalidad = Id + 1;

    const { Ide_Modulo, Ide_Aplicacion, Des_DescripcionFuncionalidad, Descripcion } = req.body;
    const functionalityResponse = new SBRTFunctionality({ Ide_Funcionalidad, Ide_Modulo, Ide_Aplicacion, Des_DescripcionFuncionalidad, Descripcion });

    // Guardar en BD
    await functionalityResponse.save();

    res.json({
        functionalityResponse
    });
}
//creating a method for updating a record
const functionalityPut = async (req, res = response) => {


    const { Ide_Funcionalidad, ...resto } = req.body;

    const functionalityResponse = await SBRTFunctionality.findOneAndUpdate({ Ide_Funcionalidad: Ide_Funcionalidad }, resto);

    res.json(functionalityResponse);
}




module.exports = {
    functionalityGet,
    functionalityPost,
    functionalityPut
}
