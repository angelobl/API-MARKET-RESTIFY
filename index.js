const restify = require('restify');
const userRoutes = require('./main/routes/users/usersRoutes')
const productRoutes = require('./main/routes/products/products.routes')
const server = restify.createServer();
const PORT = 4000;

const {mongoose} = require('./database');

//settings
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
userRoutes.applyRoutes(server);
productRoutes.applyRoutes(server)

server.listen(PORT,()=>{
    console.log(`listen on ${server.name}`, server.url);
})