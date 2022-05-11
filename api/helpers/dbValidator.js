//@ts-check
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Almacen = require('../models/almacen');
const Proveedor = require('../models/proveedor');


//Validar usuario si no existe
const existeUsuarioId = async( id = 0 )=>{
    
    try {
        const existe = await Usuario.buscar( id )
        if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
    } catch (error) {
        throw new Error(`No existe el usuario con id : ${ id }.`)
    }
}

const existeUsuario = async (user = '' ) => {
    const existe = await Usuario.buscarUsuario( user );
    if( existe ) throw new Error (`El nombre de usuario ${ user } ya existe actualmente.`);
}

const existeProductoId = async(id = '') => {

    const existe = await Producto.buscar(id);
    if(!existe) throw new Error(`El id del producto no existe en la base de datos`)
}
const existeAlmacenId = async(id = '') => {

    const existe = await Almacen.buscar(id);
    if(!existe) throw new Error(`El id del almacen no existe en la base de datos`)

}

const existeProveedorId = async (id = '') => {
    const existe = await Proveedor.buscar(id);
    if(!existe) throw new Error(`El id del proveedor no existe en la base de datos`)
}

module.exports = {
    existeUsuarioId,
    existeUsuario,
    existeProductoId,
    existeAlmacenId,
    existeProveedorId
}