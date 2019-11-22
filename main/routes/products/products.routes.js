const Route = require('restify-router').Router;
const productModel = require("../../models/product.model");
const { ownerAuth } = require("../users/authMidleware");

const ProductsRoutes = new Route()

ProductsRoutes.post('/products',async (req,res,next)=>{
  res.setHeader("Content-type", "application/json");
  try {
    const { name, price, owner} = req.body;
    await productModel.create({
      name,
      price,
      owner
    });
    
    res.writeHead(200);
    res.end(JSON.stringify({message:"Producto Agregado"}));
  } catch (e) {
    console.log(e);
    
    res.writeHead(500);
    res.end(JSON.stringify({message:"Error al crear Producto"}));
  }
})

ProductsRoutes.get('/products',async (req,res,next)=>{
  res.setHeader("Content-type", "application/json");
  try {
    const products = await productModel.find();

    
    res.writeHead(200);
    res.end(JSON.stringify(products));
  }catch (e) {
    
    res.writeHead(500);
    res.end(JSON.stringify({message:'Error'}));
  }
});

ProductsRoutes.get('/products/:id',async (req,res,next)=>{   
  res.setHeader("Content-type", "application/json");
  try {
    
    res.writeHead(201);
    const product = await productModel.findOne({_id:req.params.id})
    res.end(JSON.stringify(product));
  } catch (e) {
    
    res.writeHead(500);
    res.end(JSON.stringify({message:'Producto no encontrado'}));
  }
}); 

ProductsRoutes.put('/products/:id/:owner',ownerAuth,async (req,res,next)=>{
  
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    await productModel.findOneAndUpdate({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify({message:'Producto actualizado'}));
  } catch (e) {
    //res.setHeader("Content-type", "application/json");
    //res.writeHead(500);
    res.end(JSON.stringify({message:'Producto no encontrado'}));
  }
})

ProductsRoutes.del('/products/:id/:owner',ownerAuth,async (req,res,next)=>{
  
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    await productModel.findOneAndDelete({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify({message:'Producto eliminado'}));
  } catch (e) {
    
    //res.writeHead(500);
    res.end(JSON.stringify({message:'Producto no encontrado'}));
  }
})

module.exports = ProductsRoutes;