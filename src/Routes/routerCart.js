import express from "express";
import carts from "../data/carts.json"

const routerCart = express.Router();
let cartIdCounter = 1;


routerCart.get('/:cartId', (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ Status: "Éxito", Payload: cart });
});

routerCart.get('/', (req, res) => {
    if (carts.length <= 0) {
        return res.status(400).json({ Status: "Error", Payload: "No hay carritos disponibles" });
    }
    res.json({ Status: "Éxito", Payload: carts });
});

routerCart.post('/:cartId/add', (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.cantidad;
    const cartId = parseInt(req.params.cartId);
    const product = req.body;
    const existingCart = carts.find((cart) => cart.carts-items.some((cart) => cart.id === cartId));
    if (existingCart) {
        const existingProduct = existingCart.carts-items.find((product) => product.id === productId);
        existingProduct.cantidad += cantidad;
        res.json({ Status: "Éxito", Payload: existingCart });
    } else {
        const newCart = {
            id: cartIdCounter++,
            products: [{ id: productId, cantidad: cantidad }]
        };
        carts.push(newCart);
        res.json({ Status: "Éxito", Payload: newCart });
    }
    fs.writeFileSync('carts.json', JSON.stringify(carts, null, 2));
    res.json({ Status: "Éxito", Payload: cart });
});

routerCart.delete('/:cartId', (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const productId = req.params.productId;
    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    const cartIndex = cart.cart-items.findIndex((product) => product.id === productId);
    if (cartIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }
    cart.products.splice(cartIndex, 1);
    res.json({ Status: "Éxito", Payload: cart });
});


export default routerCart;
