const { Users } = require("../../Bd/db");
const Route = require("restify-router").Router;
const { authUser } = require("./authMidleware");
const userModel = require("../../models/user.model");

const usersRoutes = new Route();

usersRoutes.post("/users", async (req, res, next) => {
  try {
    const { owner, name, email, password } = req.body;
    await userModel.create({
      owner,
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
    res.writeHead(200);
    res.end(JSON.stringify("Error al crear usuario"));
  }
});

usersRoutes.get("/users", (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(Users));
});

usersRoutes.get("/users/:id", authUser, (req, res, next) => {
  res.writeHead(201);
  const user = Users.filter(elem => elem.id === req.params.id)[0];
  res.end(JSON.stringify(user));
});

usersRoutes.put("/users/:id", authUser, (req, res, next) => {
  try {
    const user = Users.filter(elem => elem.id === req.params.id)[0];
    Users.push({
      ...user,
      ...req.body
    });
    res.end(JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
});

module.exports = usersRoutes;
