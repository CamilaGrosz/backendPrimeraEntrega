import express, { Router } from "express";

const routerCart = express.Router();

let cart = [];

routerCart.get('/', (req, res) => {
    if (cart <= 0){
        return res.status(400).send({Status: "error", Payload: "Ocurrió un error"})
    }
    res.json(cart)
    res.send({Status: "Success", Payload: cart})
})



export default routerCart;