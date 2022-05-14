// @ts-check
const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, descripcion, unidad, proveedor, almacen, stock, precio } = data
            //@ts-ignore
            const results = await query(`insert into producto (nombre, descripcion, unid_medida, id_proveedor, precio) 
                values ("${ nombre }","${ descripcion }","${ unidad }",${ proveedor },${ precio });select max(id) as id from producto;
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
    static async actualizar (data = {}) {
        try {
            const {id, nombre, descripcion, unidad, precio } = data
            //@ts-ignore
            const results = await query(`update  producto set nombre="${ nombre }", descripcion="${ descripcion }", 
            unid_medida="${ unidad }", precio=${ precio } where id=${ id };`);

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(id){
        try {
            const rows = await query(`select p.id,p.nombre,p.descripcion,p.unid_medida,p.precio, pa.stock, pr.nombre 'proveedor' 
            from producto p 
            inner join proveedor pr on p.id_proveedor = pr.id 
            inner join producto_almacen pa on p.id = pa.id_producto and pa.id_almacen = ${ id } 
            where p.estado = 1`)

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
            console.log(error);
            return false
        }
    }
    static async cambiarStock(id='' , almacen = '', cantidad='' ){
        try {
            //@ts-ignore
            const data = await query(`update producto_almacen set stock=${ cantidad } 
            where id_producto=${ id } and id_almacen=${ almacen }`)

            return data
        } catch (error) {
            console.log(error);
            return false
        }
    }

}