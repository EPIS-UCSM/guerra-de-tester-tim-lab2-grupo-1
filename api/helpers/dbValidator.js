//@ts-check
const Usuario = require('../models/usuario');


//Validar usuario si no existe
const existeUsuarioId = async( id = 0 )=>{
    
    const existe = await Usuario.buscar( id )
    if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
}

const existeUsuario = async (user = '' ) => {
    const existe = await Usuario.buscarUsuario( user );
    if( existe ) throw new Error (`El nombre de usuario ${ user } ya existe actualmente.`);
}

module.exports = {
    existeUsuarioId,
    existeUsuario
}