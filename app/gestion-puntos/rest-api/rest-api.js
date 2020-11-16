
const puntosSrv = require('../service/PuntosClientesService');
const baseSrv   = require('../service/BaseService');


let restApiDefinition = {};

restApiDefinition.get  = [];
restApiDefinition.post = [];
restApiDefinition.put  = [];

let get   = {};
let post  = {};
let put   = {};


const enviarRespuestaREST = async (res, respuesta) => {

    if (respuesta.codigo == baseSrv.DATA_FOUND) {

        res.status(200).send(respuesta);

        return;

    } else if (respuesta.codigo == baseSrv.NO_DATA_FOUND) {

        res.status(204).send(respuesta);

        return;

    } else if (respuesta.codigo == baseSrv.REGISTRO_CREADO) {

        res.status(201).send(respuesta);

        return;

    } else {

        res.status(500).send(respuesta);

        return;
    }
};

// Crea un registro de puntos de cliente
post.url = '/puntos';
post.f = async function(req, res) {

    let respuesta = await puntosSrv.crearPuntosCliente( JSON.parse(JSON.stringify(req.body)) );

    enviarRespuestaREST(res, respuesta);
};

restApiDefinition.post.push(post);


// Actualiza un registro de puntos de cliente ya existente
put.url = '/puntos/:correo';
put.f = async function(req, res) {

    let respuesta = await puntosSrv.actualizarPuntosCliente( JSON.parse(JSON.stringify(req.body)), req.params.correo );

    enviarRespuestaREST(res, respuesta);
};

restApiDefinition.put.push(put);


// Consultar los puntos de un cliente por correo
get.url = '/puntos/:correo';
get.f = async (req, res) => {

    let respuesta = await puntosSrv.consultarPuntosCliente( req.params.correo );

    enviarRespuestaREST(res, respuesta);
};

restApiDefinition.get.push(get);




module.exports = restApiDefinition;
