const Route = require("restify-router").Router;
const userModel = require("../../models/user.model");
const passport = require('passport-restify');

const usersRoutes = new Route();


usersRoutes.post("/signup",passport.authenticate('local-singup', {
  failureRedirect: '/signup/error',
  failureFlash: true
}),function(req,res) {
  res.end(JSON.stringify({message:"Usuario registrado"}));
});

usersRoutes.get("/signup/error", async (req, res, next) => {
  res.end(JSON.stringify({message:"Usuario ya existe"}));
})

usersRoutes.post("/signin",passport.authenticate('local-signin', {
  failureRedirect: '/signin/error',
  failureFlash: true
}),function(req,res) {
  res.end(JSON.stringify({user:req.user.username}));
});

usersRoutes.get("/signin/error", async (req, res, next) => {
  res.end(JSON.stringify({message:"Usuario y/o contraseña incorrectos"}));
})

















/*
usersRoutes.post("/users", async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    const { username, password } = req.body;
    await userModel.create({
      username,
      password
    });
    
    res.writeHead(200);
    res.end(JSON.stringify("Usuario Agregado"));
  } catch (e) {
    console.log(e);
    
    res.writeHead(500);
    res.end(JSON.stringify("Error al crear usuario"));
  }
});

usersRoutes.get("/users", async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    const users = await userModel.find();

    
    res.writeHead(200);
    res.end(JSON.stringify(users));
  }catch (e) {
    
    res.writeHead(500);
    res.end(JSON.stringify('Error'));
  }
  
});

usersRoutes.get("/users/:id", async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    
    res.writeHead(201);
    const user = await userModel.findOne({_id:req.params.id})
    res.end(JSON.stringify(user));
  } catch (e) {
    
    res.writeHead(500);
    res.end(JSON.stringify('Usuario no encontrado'));
  }
  
});

usersRoutes.put("/users/:id", async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    
    res.writeHead(201);
    await userModel.findOneAndUpdate({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify('Usuario actualizado'));
  } catch (e) {
    
    res.writeHead(500);
    res.end(JSON.stringify('Usuario no encontrado'));
  }
});
*/
module.exports = usersRoutes;
