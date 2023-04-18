const express = require('express');
const app = express();
const { getProducts, getProductById } = require('./ProductManager');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager


app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit 
        const products = productManager.getProducts();
        if(limit){
            const productsLimit = products.slice(0, limit)
            res.send(productsLimit)
        }else{
            res.send(products);
        }
        
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

app.get('products/:pid', async (req, res) =>{
    try{
        const productId = req.params.pid
        const product = productManager.getProductById(productId)
        if(product){
            res.send(product)     
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    } 
});  

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});