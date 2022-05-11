//@ts-check

const { request, response } = require("express");
const Producto = require("../models/producto");


module.exports={
    getProducts: async (req = request, res = response) => {
        try {
            const data = await Producto.listar();

            return res.json({
                data
            })
        } catch (error) {
            
        }
        
    },
    postProduct: async (req = request, res = response) => {
        
        try {
            const { nombre, descripcion, unidad, proveedor, almacen, stock, precio } = req.body

            await Producto.registrar({ nombre, descripcion, unidad, proveedor, almacen, stock, precio })

            return res.json({
                msg:"Producto registrado"
            })

        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar al producto hable con el administrador"
            })
        }
        
    },
    putProduct: async (req = request, res = response) => {
        const { id } = req.params
        const { nombre, descripcion, unidad, precio } = req.body
        try {

            await Producto.actualizar({ id, nombre, descripcion, unidad, precio })

            return res.json({
                msg:"Producto actualizado"
            })

        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar al producto hable con el administrador"
            })
        }
    },

    deleteProduct: async (req = request, res = response) => {
        const { id } = req.params

        try {
            const user = await Producto.eliminar( parseInt(id) )
            if(!user){
                return res.status(400).json({
                    err:"Ocurrio un error al intentar eliminar al producto hable con el administrador"
                })
            }

            return res.json({
                msg:"Producto eliminado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar eliminar al producto hable con el administrador"
            })
        }

    },
    putStock: async (req = request, res=response) => {
        
        const { producto, almacen, cantidad } = req.body
        try {
            const user = await Producto.cambiarStock(producto, almacen, cantidad);

            return res.json({
                msg:"Stock actualizado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar actualizar el stock hable con el administrador"
            })
        }
    }

}