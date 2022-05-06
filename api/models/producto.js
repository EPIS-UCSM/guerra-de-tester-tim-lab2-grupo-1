// @ts-check
const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, descripcion, unidad, proveedor, almacen, stock} = data
            //@ts-ignore
            const results = await query(`insert into producto (nombre, descripcion, unid_medida, id_proveedor) 
                values ("${ nombre }","${ descripcion }","${ unidad }",${ proveedor });select max(id) as id from producto;
            `);

            const { id:idProducto } = results[1][0]
            
            await query(`insert into producto_almacen (id_producto, id_almacen, stock) 
            values (${ idProducto },${ almacen },${ stock })`)

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(){
        try {
            const rows = await query("select * from producto where estado = 1")

            return rows

        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    static async eliminar( id = 0 ){
        try {
            await query(`update producto set estado=0 where id=${ id }`)
            return true

        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async buscar(id){
        try {
            // @ts-ignore
            const [ usuario ] = await query(`select id from producto where id=${ id }`);

            return usuario
            
        } catch (error) {
            
        }
    }

}