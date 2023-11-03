import express, { Router } from "express";
import products from '../data/products.json'
import mongoose from "mongoose";


const routerProducts = express.Router();
let productIdCounter = 1;

routerProducts.get('/', async (req, res) => {
    try {
        const { limit, skip, sortField, sortOrder, filters } = req.query;
        const query = {};
        if (filters) {
            const filterObj = JSON.parse(filters);
            Object.keys(filterObj).forEach((key) => {
                query[key] = filterObj[key];
            });
        }
        const options = {
            limit: parseInt(limit) || 10, 
            skip: parseInt(skip) || 0, 
        };
        if (sortField && sortOrder) {
            options.sort = {
                [sortField]: sortOrder === "asc" ? 1 : -1,
            };
        }
        const products = await moongose.Product.find(query, null, options);
        res.json({ Status: "Éxito", Payload: products });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error en la consulta de productos" });
    }
    if (products <= 0){
        return res.status(400).send({Status: "error", Payload: "Ocurrió un error"})
    }
    res.json(products) 
    res.send({Status: "Success", Payload: products})
})

routerProducts.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit && !isNaN(limit) && parseInt(limit) > 0) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json({ Status: "Éxito", Payload: limitedProducts });
    } else {
        res.json({ Status: "Éxito", Payload: products });
    }
});


routerProducts.get('/:pid',(req, res) => {
    const id = parseInt(req.params.id)
    const product = this.products.find(product => product.id === id);
    if(!product){
        return res.status(400).json({error: "No encontrado"})
    }
    res.json({Status: "Succes", Payload: product})
})

routerProducts.post('/', (req, res) => {
    if (
    req.body.hasOwnProperty("stock") &&
    req.body.hasOwnProperty("price") &&
    req.body.hasOwnProperty("thumbnails") &&
    req.body.hasOwnProperty("code") &&
    req.body.hasOwnProperty("description") &&
    req.body.hasOwnProperty("title") &&
    req.body.hasOwnProperty("status") &&
    req.body.hasOwnProperty("category") 
    ) {
        const id = productIdCounter++
        const newProduct = req.body + {id: productIdCounter}
        products.push(newProduct)
        res.status(201).json(newProduct)
    } else {
        res.status(400).json({error: "No encontrado"})
    }
})

routerProducts.put('/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    // Actualiza el producto en la matriz.
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json({ Status: "Éxito", Payload: products[productIndex] });
});

routerProducts.delete('/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    const deletedProduct = products.splice(productIndex, 1);
    res.json({ Status: "Éxito", Payload: deletedProduct });
});


export default routerProducts;