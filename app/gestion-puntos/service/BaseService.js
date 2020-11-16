
const BaseService = {};


BaseService.DATA_FOUND           = "DF";
BaseService.NO_DATA_FOUND        = "NDF";
BaseService.REGISTRO_CREADO      = "RC";
BaseService.REGISTRO_ACTUALIZADO = "RA";

BaseService.ERROR                    = "E";
BaseService.ERROR_REGISTRO_DUPLICADO = "ERD";
BaseService.ERROR_REGISTRO_NO_EXISTE = "ERNE";


BaseService.crearRespuestaServicio = async () => ({

    error: null,
    datos: null,
    mensaje: null,
    codigo: this.ERROR
});


module.exports = BaseService;
