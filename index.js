const restify = require('restify');
const userRoutes = require('./main/routes/users/usersRoutes')
const productRoutes = require('./main/routes/products/products.routes')
const server = restify.createServer({socketio: true});
const PORT = 4000;
const passport = require('passport-restify');
const corsMiddleware = require('restify-cors-middleware')
const io = require('socket.io')(server);

require('./main/passport/local-auth');
require('./database');


const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
  })

//settings
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.pre(cors.preflight)
server.use(cors.actual)
server.use(passport.initialize());
server.use(passport.session());



io.on('connection', client => {
  console.log("Socket conectado "+client.id)
  let user = null;
//console.log(client)

client.on('userLogged', data => { 
  client.broadcast.emit('user',data)
  user = data;
});

  client.on('newMessage', data => { 
    io.emit('showMessage',data)
  });
  
  client.on('disconnect', () => { 
    client.broadcast.emit('userDisconnected',user)
    console.log("Socket desconectado "+client.id)
    console.log(user);
   });
 });



userRoutes.applyRoutes(server);
productRoutes.applyRoutes(server)



server.listen(PORT,()=>{
    console.log(`listen on ${server.name}`, server.url);
})