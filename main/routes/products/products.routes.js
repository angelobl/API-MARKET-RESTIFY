const {Products} = require('../../Bd/db');
const Route = require('restify-router').Router;

const ProductsRoutes = new Route()

ProductsRoutes.post('/products',(req,res,next)=>{
  try{
    Products.push({...req.body})
    res.end(JSON.stringify(Products)) 
  }catch(e){
      console.log(e)
  }
})

ProductsRoutes.get('/products',(req,res,next)=>{
  res.setHeader('Content-type', 'application/json')
  res.writeHead(200)
  res.end(JSON.stringify(Products))
});

ProductsRoutes.get('/products/:id',(req,res,next)=>{   
  res.writeHead(201)
  const product = Products.filter((elem)=>elem.id ===req.params.id)[0];
  res.end(JSON.stringify(product)) 
}); 

ProductsRoutes.put('/products/:id', (req,res,next)=>{
  try{
    const product = Products.filter((elem)=>elem.id ===req.params.id)[0];
    Products.push({
      ...product,
      ...req.body
    })
    res.end(JSON.stringify(product)) 
  }catch(e){
      console.log(e)
  }
})

module.exports = ProductsRoutes;