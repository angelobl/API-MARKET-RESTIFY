const {Users} = require('../../Bd/db');

module.exports.authUser = (req,res,next) =>{
  const user = Users.filter((user) =>  req.params.id === user.id)[0];
  if(!user){
      res.end(JSON.stringify({message: 'No existe esta persona'}))
  }
  next()
}