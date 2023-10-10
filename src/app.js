import routerProducts from "./Routes/routerProducts";
import routerCart from "./Routes/routerCart";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('api/products', routerProducts);
app.use('api/cart', routerCart);

app.listen(port, () => {
    console.log("Servidor activo");
})
