const Route = require("restify-router").Router;
const userModel = require("../../models/user.model");

const usersRoutes = new Route();

usersRoutes.post("/users", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await userModel.create({
      name,
      email,
      password
    });
    res.setHeader("Content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify("Usuario Agregado"));
  } catch (e) {
    console.log(e);
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify("Error al crear usuario"));
  }
});

usersRoutes.get("/users", async (req, res, next) => {
  try {
    const users = await userModel.find();

<<<<<<< HEAD
usersRoutes.get('/users',(req,res,next)=>{
  // res.setHeader('Content-type', 'application/json')
  // res.writeHead(200)
  res.render('home.pug')
=======
    res.setHeader("Content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(users));
  }catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Error'));
  }
  
>>>>>>> 91069c078f4a1dd8a7e1696a216ada78781dd2bd
});

usersRoutes.get("/users/:id", async (req, res, next) => {
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    const user = await userModel.findOne({_id:req.params.id})
    res.end(JSON.stringify(user));
  } catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Usuario no encontrado'));
  }
  
});

usersRoutes.put("/users/:id", (req, res, next) => {
  try {
    res.setHeader("Content-type", "application/json");
    res.writeHead(201);
    await userModel.findOneAndUpdate({_id:req.params.id},  {$set:{...req.body}} )
    res.end(JSON.stringify('Usuario actualizado'));
  } catch (e) {
    res.setHeader("Content-type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify('Usuario no encontrado'));
  }
});

module.exports = usersRoutes;
