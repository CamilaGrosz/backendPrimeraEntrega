import express, { Router } from "express";

const routerCart = express.Router();

let cart = [];
let productIdCounter = 1;

routerCart.get('/', (req, res) => {
    if (cart <= 0){
        return res.status(400).send({Status: "error", Payload: "Ocurrió un error"})
    }
    res.json(cart)
    res.send({Status: "Success", Payload: cart})
})

routerCart.get('/:pid',(req, res) => {
    const id = parseInt(req.params.id)
    const product = this.cart.find(product => product.id === id);
    if(!product){
        return res.status(400).json({error: "No encontrado"})
    }
    res.json({Status: "Succes", Payload: product})
})


export default routerCart;