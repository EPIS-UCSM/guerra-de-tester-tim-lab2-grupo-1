// @ts-check
const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, direccion = '' } = data
            await query(`
                insert into proveedor (nombre, direccion) values ("${ nombre }","${ direccion }")`)

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(){
        try {
            const rows = await query("select * from proveedor")

            return rows

        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    static async buscar(id){
        try {
            // @ts-ignore
            const [ usuario ] = await query(`select id from proveedor where id=${ id }`);

            return usuario
            
        } catch (error) {
            
        }
    }

    static async editar( data = {} ){
        const { id, nombre, direccion } = data;
        try {

            await query(`update proveedor set nombre="${ nombre }", direccion="${ direccion }" where id=${ id }`);
            return true;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    static async eliminar( id = '' ){
        try {
            
            await query(`delete from proveedor where id=${ id }`)
            return true

        } catch (error) {
            console.log(error);
            return false
        }
    }

}