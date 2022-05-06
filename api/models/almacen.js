// @ts-check
const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, direccion = '' } = data
            await query(`insert into almacen (nombre, direccion) values ("${ nombre }","${ direccion }");`)

            return true

        } catch (error) {

           console.log(error);
           throw error  

        }
    }

    static async listar(){
        try {
            const rows = await query("select * from almacen")

            return rows;

        } catch (error) {

            console.log(error);
            throw error   
        }
    }

    
    static async buscar(id){
        try {
            // @ts-ignore
            const [ almacen ] = await query(`select id from almacen where id=${ id }`);
            
            return almacen
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async editar( data = {} ){
        const { id, nombre, direccion } = data;
        try {

            await query(`update almacen set nombre="${ nombre }", direccion="${ direccion }" where id=${ id }`);
            return true;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    static async eliminar( id = '' ){
        try {
            
            await query(`delete from almacen where id=${ id }`)
            return true

        } catch (error) {
            console.log(error);
            return false
        }
    }
}