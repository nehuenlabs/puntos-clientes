
const chai = require('chai');

const expect = chai.expect;

const models = require('../gestion-puntos/model/model')


it("El método factory para PuntosClientes debe crear un objeto PuntosCliente válido", ()=> {

    let puntosCliente = models.crearPuntosCliente('correo', 0, 'tienda');

    expect( puntosCliente.correo == 'correo' ).to.be.true;
    expect( puntosCliente.puntosTienda.length == 0 ).to.be.true;
});

