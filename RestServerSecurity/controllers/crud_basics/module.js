const { response } = require('express');

const SBRTModule = require('../../models/sbrt_modulo');

//Function to get all modules registered in the database
const moduleGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [module] = await Promise.all([

        SBRTModule.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        module
    });
}
//Function to create modules in the database
const modulePost = async (req, res = response) => {

    const [modu] = await Promise.all([
        SBRTModule.find()
    ]);
    const orderedResults = modu.sort((a, b) => {
        return Number.parseInt(b.Ide_Modulo) - Number.parseInt(a.Ide_Modulo)
    })


    const Id = orderedResults[0].Ide_Modulo;
    const Ide_Modulo = Id + 1;

    const { Ide_Aplicacion, Des_DescripcionModulo } = req.body;
    const modul = new SBRTModule({ Ide_Modulo, Ide_Aplicacion, Des_DescripcionModulo });



    // Guardar en BD
    await modul.save();

    res.json({
        modul
    });
}
//creating a method for updating a record
const modulePut = async (req, res = response) => {


    const { Ide_Modulo, ...resto } = req.body;

    const modul = await SBRTModule.findOneAndUpdate({ Ide_Modulo: Ide_Modulo }, resto);

    res.json(modul);
}




module.exports = {
    moduleGet,
    modulePost,
    modulePut
}
