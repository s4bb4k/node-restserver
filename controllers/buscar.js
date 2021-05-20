const {response} = require('express');
const {ObjectId} = require('mongoose').Types;

const {Usuario, Categoria, Producto} = require("../models");

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categoria',
    'roles'
];

const buscarUsuario = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i')
    const categoria = await Categoria.find({nombre: regex, estado: true});

    res.json({
        results: categoria
    });
}



const buscarProducto = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    const producto = await Producto.find({nombre: regex, estado: true});

    res.json({
        results: producto
    });

}

const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res);
            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        default:
            res.status(500).json({
                msg: "seleccion pendiente"
            });
    }

}

module.exports = {
    buscar
}

