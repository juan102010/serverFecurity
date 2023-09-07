const { response } = require('express');

const SBRTApplication = require('../../models/sbrt_aplicacion');

//Function to get all applications registered in the database
const applicationGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Est_Habilitado: true };

    const [total, application] = await Promise.all([
        SBRTApplication.countDocuments(query),
        SBRTApplication.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        application
    });
}
//Function for creating applications in the database
const applicationPost = async (req, res = response) => {

    const [applications] = await Promise.all([
        SBRTApplication.find()
    ]);
    const resultadosOrdenados = applications.sort((a, b) => {
        return Number.parseInt(b.Ide_Aplicacion) - Number.parseInt(a.Ide_Aplicacion)
    })


    const Ide = resultadosOrdenados[0].Ide_Aplicacion;
    const Ide_Aplicacion = Ide + 1;

    const { Des_DescripcionAplicacion, Est_Habilitado } = req.body;
    const application = new SBRTApplication({ Ide_Aplicacion, Des_DescripcionAplicacion, Est_Habilitado });



    // Guardar en BD
    await application.save();

    res.json({
        application
    });
}
//creating a method for updating a record
const applicationPut = async (req, res = response) => {

    const { Ide_Aplicacion, ...resto } = req.body;

    const application = await SBRTApplication.findOneAndUpdate({ Ide_Aplicacion: Ide_Aplicacion }, resto);

    res.json(application);
}

//logical deletion of a user
const applicationDelete = async (req, res = response) => {

    const { Ide_Aplicacion } = req.params;
    const application = await SBRTApplication.findOneAndUpdate({ Ide_Aplicacion: Ide_Aplicacion }, { Est_Habilitado: false });

    res.json(application);
}


module.exports = {
    applicationGet,
    applicationPost,
    applicationPut,
    applicationDelete
}
