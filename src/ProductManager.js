const fs = require("fs")

class ProductManager{

    constructor(){
        this.productArray = []
        this.path = "./productos.json"
        fs.writeFileSync(this.path, JSON.stringify(this.productArray, null, "\t"))
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {   
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Faltan Datos')
        }
        else if (!this.validadCode(code)){
            let id = this.#generateID()
            this.productArray.push({title, description, price, thumbnail, stock, code, id}) 
            fs.writeFileSync(this.path, JSON.stringify(this.productArray, null, "\t"))
        }
    }

    #generateID = () => {
        if(this.productArray.length === 0){
            return 1
        }else{
            return this.productArray[this.productArray.length-1].id +1       
                
        }
    }

    validadCode(code){
        return this.productArray.some(i => i.code === code )
    }
    

    getProducts(){
        const getProductList = fs.readFileSync(this.path, "utf-8")
        return (getProductList)
    }

    getProductById(id){
        
        const getLista = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    
        const productByIdFound = getLista.find(item=> item.id === id)
        productByIdFound === undefined ? console.log("Not Found") : console.log(productByIdFound); 
        return (productByIdFound)
    }

    updateProduct(id, fieldToUpdate, newValue) {
     
        const listProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      
        const productToUpdate = listProducts.find(item => item.id === id);
      
        if (!productToUpdate) {
          throw new Error(`No se encontró el producto con id ${id}`);
        }
      
        productToUpdate[fieldToUpdate] = newValue;
      
        fs.writeFileSync('productos.json', JSON.stringify(listProducts, null, "\t"));
      
        console.log(`El producto con id ${id} se ha actualizado`);
    }

    deleteProduct(id) {

        const listProducts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      
        const indexToDelete = listProducts.findIndex( item => item.id === id);
      
        if (indexToDelete === -1) {
          throw new Error(`No se encontró el producto con id ${id}`);
        }
      
        listProducts.splice(indexToDelete, 1);

        fs.writeFileSync('productos.json', JSON.stringify(listProducts, null, "\t"));
      
        console.log(`El producto con id ${id} se ha eliminado`);
      }

}

module.exports = ProductManager;
/* module.exports = getProducts;
module.exports = getProductById; */

const manager = new ProductManager()
/* manager.addProduct('Celular', 'Descripcion celular', 561, 'img121', '1code', 3)
manager.addProduct('Juguete', 'Descripcion juguete', 562, 'img122', '2code', 3)
manager.addProduct('TV', 'Descripcion Tv', 563, 'img123', '3code', 3)
manager.addProduct('Notebook', 'Descripcion notebook', 564, 'img124', '4code', 3)
manager.addProduct('Auriculares', 'Descripcion auriculares', 565, 'img125', '5code', 3)
manager.addProduct('Horno', 'Descripcion horno', 566, 'img126', '6code', 3)
manager.addProduct('Cuchillo', 'Descripcion cuchillo', 567, 'img127', '7code', 3)
manager.addProduct('Tenedor', 'Descripcion tenedor', 568, 'img128', '8code', 3)
manager.addProduct('Cuchara', 'Descripcion cuchara', 569, 'img129', '9code', 3)
manager.addProduct('Vaso', 'Descripcion vaso', 570, 'img130', '10code', 3) */
/* manager.addProduct('Yob', 563, 'img125', '6code', 3) */
/* console.log(manager.getProductById(3))
console.log(manager.getProducts())
manager.updateProduct(3, "stock", 6)
manager.updateProduct(2, "price", 570)
manager.deleteProduct(3) */