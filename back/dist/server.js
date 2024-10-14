"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Product_1 = require("./Product");
const cors = require("cors");
const app = express();
const PORT = 3000;
const DATA_FILE = "products.json";
app.use(bodyParser.json());
app.use(cors());
// Fonction pour lire les produits à partir du fichier JSON
const readProducts = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data.toString());
};
// Fonction pour écrire les produits dans le fichier JSON
const writeProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};
// Route POST /products
app.post("/products", (req, res) => {
    const products = readProducts();
    const newProduct = new Product_1.Product(Object.assign(Object.assign({}, req.body), { id: products.length + 1, createdAt: Date.now(), updatedAt: Date.now() }));
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});
// Route GET /products
app.get("/products", (req, res) => {
    const products = readProducts();
    res.json(products);
});
// Route GET /products/:id
app.get("/products/:id", (req, res) => {
    const products = readProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).send("Product not found");
    }
});
// Route PATCH /products/:id
app.patch("/products/:id", (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const updatedProduct = Object.assign(Object.assign(Object.assign({}, products[index]), req.body), { updatedAt: Date.now() });
        products[index] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    }
    else {
        res.status(404).send("Product not found");
    }
});
// Route PUT /products/:id
app.put("/products/:id", (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const updatedProduct = Object.assign(Object.assign({}, req.body), { id: parseInt(req.params.id), updatedAt: Date.now() });
        products[index] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    }
    else {
        res.status(404).send("Product not found");
    }
});
// Route DELETE /products/:id
app.delete("/products/:id", (req, res) => {
    const products = readProducts();
    const newProducts = products.filter((p) => p.id !== parseInt(req.params.id));
    if (newProducts.length < products.length) {
        writeProducts(newProducts);
        res.status(204).send();
    }
    else {
        res.status(404).send("Product not found");
    }
});
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
