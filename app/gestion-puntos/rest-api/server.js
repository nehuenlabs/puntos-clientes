
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

app.use( bodyParser.urlencoded({ extended: false }) );

app.use( bodyParser.json() );

  
const PORT = 3000;

const WebServer = {};


WebServer.start = function() {

//    app.use( express.json() );
    app.use( express.urlencoded({ extended: true }) );

    app.listen(PORT, () => {

        console.log('+---------------------------+');
        console.log('|   eCommerce API started   |');
        console.log('+---------------------------+');
        console.log('Current system time: ', new Date().toISOString());
    });
    
};


WebServer.addPOST = function(path, callbackFunction) {

    app.post(path, callbackFunction);
};

WebServer.addPUT = function(path, callbackFunction) {

    app.put(path, callbackFunction);
};

WebServer.addGET = function(path, callbackFunction) {

    app.get(path, callbackFunction);
};

WebServer.add404 = function() {

    app.get('*', function(req, res) {

        res.status(404)
                .send({
                    error: 404,
                    datos: null,
                    mensaje: 'Ruta inválida.'
                });
    });
};




module.exports = WebServer;
