import routerProducts from "./routes/routerProducts.js";
import routerCart from "./routes/routerCart";
import bodyParser from "body-parser";
import express from "express";
import mongo from './config/db.js'

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('api/products', routerProducts);
app.use('api/cart', routerCart);

app.listen(port, () => {
    console.log("Servidor activo");  
})
