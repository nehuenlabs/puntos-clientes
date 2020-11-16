
const webSrv = require('./gestion-puntos/rest-api/server');

const restApiDefinition = require('./gestion-puntos/rest-api/rest-api');

const database = require('./gestion-puntos/data/database');

database.connect();

restApiDefinition.post.forEach( (def) => webSrv.addPOST(def.url, def.f) );
restApiDefinition.put.forEach( (def) => webSrv.addPUT(def.url, def.f) );
restApiDefinition.get.forEach( (def) => webSrv.addGET(def.url, def.f) );

webSrv.add404();


webSrv.start();


