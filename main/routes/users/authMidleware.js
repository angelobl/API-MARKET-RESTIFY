const productModel = require("../../models/product.model");

module.exports.ownerAuth = async (req,res,next) =>{
  const product = await productModel.findOne({_id:req.params.id})
  if(product.owner!==req.params.owner){
    res.end(JSON.stringify('Usuario no es owner'));
  }
  next();
  
}