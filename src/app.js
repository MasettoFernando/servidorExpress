const express = require('express');
const app = express();
/* const { getProducts, getProductById  }= require('./ProductManager'); */
const ProductManager = require('./ProductManager');
const productManager = new ProductManager

productManager.addProduct('Celular', 'Descripcion celular', 561, 'img121', '1code', 3)
productManager.addProduct('Juguete', 'Descripcion juguete', 562, 'img122', '2code', 3)
productManager.addProduct('TV', 'Descripcion Tv', 563, 'img123', '3code', 3)
productManager.addProduct('Notebook', 'Descripcion notebook', 564, 'img124', '4code', 3)
productManager.addProduct('Auriculares', 'Descripcion auriculares', 565, 'img125', '5code', 3)
productManager.addProduct('Horno', 'Descripcion horno', 566, 'img126', '6code', 3)
productManager.addProduct('Cuchillo', 'Descripcion cuchillo', 567, 'img127', '7code', 3)
productManager.addProduct('Tenedor', 'Descripcion tenedor', 568, 'img128', '8code', 3)
productManager.addProduct('Cuchara', 'Descripcion cuchara', 569, 'img129', '9code', 3)
productManager.addProduct('Vaso', 'Descripcion vaso', 570, 'img130', '10code', 3)
productManager.getProductById(3)

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit 
        const products = productManager.getProducts();
        /* const products = await getProducts(); */
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

app.get('/products/:pid', async (req, res) =>{
    try{
        const productId = parseInt(req.params.pid)
        const product = productManager.getProductById(productId)
        const productById = productManager.getProductById(productId)
        res.send(productById)
        /* const product = await getProductById(productId) */
        if(product){
            res.send(product)     
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    } 
});  

app.delete('/products/:pid', async (req, res) => {
    try{
        const productId = parseInt(req.params.pid)
        const product = productManager.deleteProduct(productId)
        res.send(product)
    }catch(error){
        res.status(500).send('Internal server Error')
    }
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
}); 