//@ts-check

const { request, response } = require("express");
const Proveedor = require("../models/proveedor");


module.exports={
    getSupplier: async (req = request, res = response) => {
        try {
            const data = await Proveedor.listar();

            return res.json({
                data
            })
        } catch (error) {
            
        }
        
    },
    postSupplier: async (req = request, res = response) => {
        
        try {
            const { nombre, direccion } = req.body

            await Proveedor.registrar({ nombre, direccion })

            return res.json({
                msg:"Proveedor registrado"
            })

        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar hable con el administrador"
            })
        }
        
    },
    putSupplier: async (req = request, res = response) => {
        try {
            const { id } = req.params
            const { nombre, direccion } = req.body

            await Proveedor.editar({ id, nombre, direccion })

            return res.json({ msg: "Proveedor actualizado" })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar actualizar hable con el administrador"
            })
        }
    },
    deleteSupplier: async (req = request, res = response) => {
        try {
            const { id } = req.params;

            await Proveedor.eliminar(id)
            return res.json({ msg: "Proveedor eliminado" })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar eliminar hable con el administrador"
            })
        }
    }
}