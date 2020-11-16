
const mongoose = require('mongoose');

const model = require('../model/PuntosClienteModel');

const MONGODB_URL = 'mongodb+srv://marcello:marcello1234@development.pxemt.gcp.mongodb.net/test?retryWrites=true&w=majority';

var database = {};

database.PUNTOS_CLIENTE_COLLECTION = "puntos";

database.connect = async function() {

    await mongoose.connect(MONGODB_URL, {

        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log('connected to mongoDB');
};

database.getCollection = async () => {


};

let PuntosClienteSchema = mongoose.Schema(model.PuntosClienteSchema);
database.PuntosCliente = mongoose.model('PuntosCliente', PuntosClienteSchema, model.COLLECTION_NAME);

let PuntosTiendaSchema = mongoose.Schema(model.PuntosTiendaSchema);
database.PuntosTienda  = mongoose.model('PuntosTienda', PuntosTiendaSchema, model.COLLECTION_NAME);

module.exports = database;
