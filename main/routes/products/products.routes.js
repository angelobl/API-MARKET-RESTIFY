let {Products} = require('../../Bd/db');
const Route = require('restify-router').Router;
const productModel = require("../../models/product.model");

const ProductsRoutes = new Route()

ProductsRoutes.post('/products',async (req,res,next)=>{
  try {
    const { name, price, owner} = req.body;
    await productModel.create({
      name,
      price,
      owner
    });
    res.setHeader("Content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify("Producto Agregado"));
  } catch (e) {
    console.log(e);
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify("Error al crear Producto"));
  }
})

ProductsRoutes.get('/products',async (req,res,next)=>{
  try {
    const products = await productModel.find();

    res.setHeader("Content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(products));
  }catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Error'));
  }
});

ProductsRoutes.get('/products/:id',(req,res,next)=>{   
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    const product = await productModel.findOne({_id:req.params.id})
    res.end(JSON.stringify(product));
  } catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Producto no encontrado'));
  }
}); 

ProductsRoutes.put('/products/:id', (req,res,next)=>{
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    await productModel.findOneAndUpdate({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify('Producto actualizado'));
  } catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Producto no encontrado'));
  }
})

ProductsRoutes.del('/products/:id', (req,res,next)=>{
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    await productModel.findOneAndDelete({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify('Producto eliminado'));
  } catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Producto no encontrado'));
  }
})

module.exports = ProductsRoutes;