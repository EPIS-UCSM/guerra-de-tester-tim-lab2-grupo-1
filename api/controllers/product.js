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
            const { nombre, descripcion, unidad, proveedor, almacen, stock } = req.body

            await Producto.registrar({ nombre, descripcion, unidad, proveedor, almacen, stock })

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

    }
}