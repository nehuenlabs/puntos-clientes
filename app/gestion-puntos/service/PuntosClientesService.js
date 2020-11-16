
const database = require('../data/database');
const baseSrv  = require('./BaseService');

let PuntosSrv = {};


const buscarPuntosCliente = async (pcorreo) => {

    let query = {correo: pcorreo};

    return await database.PuntosCliente.findOne(query);
};


// Función que crea un registro de puntos de clientes
PuntosSrv.crearPuntosCliente = async function(puntosCliente) {

    let rsp = await baseSrv.crearRespuestaServicio();

    let puntosClienteModel = null;

    try {
            puntosClienteModel = await buscarPuntosCliente(puntosCliente.correo);

            if (puntosClienteModel) {

                rsp.error   = new Error('Registro de puntos ya existe.');
                rsp.mensaje = 'Registro de puntos ya existe.';
                rsp.codigo  = baseSrv.ERROR_REGISTRO_DUPLICADO;

                return rsp;
            }

    } catch (e) {

        // Log error en mongoDB
        console.log('error crearPuntosCliente-1: ', e);

        rsp.mensaje = e.message;
        rsp.codigo  = baseSrv.ERROR;

        return rsp;
    }

    try {
            puntosClienteModel = database.PuntosCliente();

            puntosClienteModel.correo = puntosCliente.correo;
        
            puntosCliente.puntosTienda.forEach(punto => {
        
                let puntoTiendaModel = database.PuntosTienda();
                puntoTiendaModel.tienda = punto.tienda;
                puntoTiendaModel.puntos = punto.puntos;
        
                puntosClienteModel.puntosTienda.push(puntoTiendaModel);
            });

            await puntosClienteModel.save();

            rsp.codigo = baseSrv.REGISTRO_CREADO;
            rsp.datos = puntosClienteModel;

    } catch (e) {

        // Log error en mongoDB
        console.log('error crearPuntosCliente-2: ', e);

        rsp.mensaje = e.message;
        rsp.codigo  = baseSrv.ERROR;
    }


    return rsp;    
};


// Función que actualiza un registro de puntos de clientes
PuntosSrv.actualizarPuntosCliente = async function(puntosCliente, pcorreo) {

    let rsp = await baseSrv.crearRespuestaServicio();

    let puntosClienteModel = null;

    try {
            puntosClienteModel = await buscarPuntosCliente(pcorreo);

            if (!puntosClienteModel) {

                rsp.error   = new Error('No se encontró el registro.');
                rsp.mensaje = 'No se encontró el registro.';
                rsp.codigo  = baseSrv.ERROR_REGISTRO_NO_EXISTE;

                return rsp;
            }

    } catch (e) {

        // Log error en mongoDB
        console.log('error actualizaPuntosCliente-1: ', e);

        rsp.mensaje = e.message;
        rsp.codigo  = baseSrv.ERROR;

        return rsp;
    }

    try {
            puntosCliente.puntosTienda.forEach(p => {
        
                let regTienda = puntosClienteModel.puntosTienda.find(t => t.tienda === p.tienda);

                if (typeof regTienda != 'undefined') {

                    regTienda.puntos = (p.puntos + regTienda.puntos);

                } else {

                    regTienda = database.PuntosTienda();
                    regTienda.puntos = p.puntos;
                    regTienda.tienda = p.tienda;

                    puntosClienteModel.puntosTienda.push(regTienda);
                }
            });

            await puntosClienteModel.save();

            rsp.codigo = baseSrv.REGISTRO_CREADO;
            rsp.datos = puntosClienteModel;
    
    } catch (e) {

        // Log error en mongoDB
        console.log('error actualizaPuntosCliente-2: ', e);

        rsp.mensaje = e.message;
        rsp.codigo  = baseSrv.ERROR;
    }


    return rsp;    
};


// Función que consulta por un cliente, por correo y tienda
PuntosSrv.consultarPuntosCliente = async (pcorreo) => {

    let rsp = await baseSrv.crearRespuestaServicio();

    try {
            rsp.datos = await buscarPuntosCliente(pcorreo);

            rsp.codigo = !rsp.datos ? baseSrv.NO_DATA_FOUND : baseSrv.DATA_FOUND;

    } catch (e) {

        // Log error en mongoDB
        console.log('error consultarPuntosCliente: ', e);

        rsp.mensaje = e.message;
        rsp.codigo  = baseSrv.ERROR;
    }


    return rsp;
};




module.exports = PuntosSrv;
