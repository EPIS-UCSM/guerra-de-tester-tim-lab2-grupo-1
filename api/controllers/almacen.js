//@ts-check

const { request, response } = require("express");
const Almacen = require("../models/almacen");


module.exports={
    getAlmacen: async (req = request, res = response) => {
        try {
            const data = await Almacen.listar();

            return res.json({
                data
            })
        } catch (error) {
            
        }
        
    },
    postAlmacen: async (req = request, res = response) => {
        
        try {

            const { nombre, direccion } = req.body

            await Almacen.registrar({ nombre, direccion })

            return res.json({ msg:"Almacen registrado" })

        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar hable con el administrador"
            })
        }
    },
    putAlmacen: async (req = request, res = response) => {
        try {
            const { id } = req.params
            const { nombre, direccion } = req.body

            await Almacen.editar({ id, nombre, direccion })

            return res.json({ msg: "Almacen actualizado" })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar actualizar hable con el administrador"
            })
        }
    },
    deleteAlmacen: async (req = request, res = response) => {
        try {
            const { id } = req.params;

            await Almacen.eliminar(id)
            return res.json({ msg: "Almacen eliminado" })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar eliminar hable con el administrador"
            })
        }
    }

}