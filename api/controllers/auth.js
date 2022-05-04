//@ts-check
const bcryptjs = require('bcryptjs');

const { response, request } = require('express');
const { query } = require('../database/config')


const login = async (req = request,res=response )  =>{
    
    const { usuario,password } = req.body;

    try {

        const usuarioDb = await query(`select * from usuario where user_ = "${ usuario }"`);
        
        if(!usuarioDb[0]) return res.status(400).json({
             msg:'El usuario no existe'
        })

        //Usuario activo
        if (!usuarioDb[0].estado) return res.status(400).json({
            msg:'Este usuario no se encuentra registrado en la base de datos'
        })
        
        //Verificar el password
        const validaPassword = bcryptjs.compareSync( password,usuarioDb[0].password_ );
        if(!validaPassword) return res.status(400).json({
             msg:'El password proporcionado para el usuario es incorrecto'
        })
        const { nombre, user_ } = usuarioDb[0]

        res.json({
            nombre,
            user:user_,
        })

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Ha ocurrido un error hable con el administrador'
        })
    }

}

module.exports = {
    login,
}