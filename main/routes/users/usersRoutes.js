const Route = require("restify-router").Router;
const userModel = require("../../models/user.model");

const usersRoutes = new Route();

usersRoutes.post("/users", async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    const { name, email, password } = req.body;
    await userModel.create({
      name,
      email,
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

module.exports = usersRoutes;
