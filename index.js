const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
var http = require("http");
const session = require("express-session");
const passport = require("passport");

require("./main/passport/local-auth");
require("./database");

//Setting
app.set("port", 4000);

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  session({
    secret: "session1",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//app.use(logger);

//routes
app.use("/",require("./main/routes/index/index.routes"))
app.use("/products", require("./main/routes/products/products.routes"));
app.use("/users", require("./main/routes/users/users.routes"));



//Sockets
var server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", client => {
  console.log("Socket conectado " + client.id);
  let user = null;
  //console.log(client)

  client.on("userLogged", data => {
    client.broadcast.emit("user", data);
    user = data;
  });

  client.on("newMessage", data => {
    io.emit("showMessage", data);
  });

  client.on("disconnect", () => {
    client.broadcast.emit("userDisconnected", user);
    console.log("Socket desconectado " + client.id);
    console.log(user);
  });
});

//Server
server.listen(app.get("port"), () => {
  console.log("server on port 4000");
});
