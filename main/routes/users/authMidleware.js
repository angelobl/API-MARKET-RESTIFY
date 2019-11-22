const productModel = require("../../models/product.model");

module.exports.ownerAuth = async (req,res,next) =>{
  res.setHeader("Content-type", "application/json");
  try {
    const product = await productModel.findOne({_id:req.params.id})
    if(product.owner!==req.params.owner){
      res.writeHead(500);
      res.end(JSON.stringify({message:'Usuario no es owner'}));
    }
    next();
  } catch(err) {
    res.writeHead(500);
    res.end(JSON.stringify(err))
  }
  
  
}