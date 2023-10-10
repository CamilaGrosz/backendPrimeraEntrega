import express, { Router } from "express";

const routerProducts = express.Router();

let products = [];
let productIdCounter = 1;

routerProducts.get('/', (req, res) => {
    if (products <= 0){
        return res.status(400).send({Status: "error", Payload: "Ocurrió un error"})
    }
    res.json(products)
    res.send({Status: "Success", Payload: products})
})

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

export default routerProducts;