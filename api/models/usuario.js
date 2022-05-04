// @ts-check
const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, usuario, password_} = data
            await query(`
                insert into usuario (nombre,user_,password_) 
                values ("${ nombre }","${ usuario }","${ password_ }")`)

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(){
        try {
            const rows = await query("select * from usuario")

            return rows
        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    static async eliminar(id){
        try {
            await query(`update usuario set estado=0 where id=${ id }`)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async buscar(id){
        try {
            // @ts-ignore
            const [ usuario ] = await query(`select id from usuario where id=${ id }`);
            return usuario
        } catch (error) {
            
        }
    }

    static async buscarUsuario( user = '' ){
        try {
            // @ts-ignore
            const [ usuario ] = await query(`select user_ from usuario where user_="${ user }"`);
   
            return usuario
            
        } catch (error) {
            
        }
    }
}