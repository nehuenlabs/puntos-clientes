const { Schema } = require("mongoose");

const PuntosClienteModel = {};

PuntosClienteModel.COLLECTION_NAME = "puntos";

PuntosClienteModel.PuntosTiendaSchema = new Schema({

    tienda: {type: String, required: true, trim: true},
    puntos: {type: Number, required: true}

});

PuntosClienteModel.PuntosClienteSchema = new Schema({

    correo: {type: String, required: true, trim: true},
    puntosTienda: [PuntosClienteModel.PuntosTiendaSchema]

});


PuntosClienteModel.crearPuntosCliente = (pcorreo) => ({
    correo: pcorreo,
    puntosTienda: []
});

PuntosClienteModel.crearPuntosCliente = (pcorreo, ppuntos) => ({
    correo: pcorreo,
    puntosTienda: ppuntos
});

PuntosClienteModel.crearPuntosTienda = (ptienda, ppuntos) => ({
    tienda: ptienda,
    puntos: ppuntos
});


module.exports = PuntosClienteModel;
