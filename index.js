const restify = require('restify');
const render = require('restify-render-middleware')
const userRoutes = require('./main/routes/users/usersRoutes');
const productRoutes = require('./main/routes/products/products.routes');

const PORT = process.env.PORT || 4000;

const server = restify.createServer();

server.use(render({
  engine: 'pug',
  dir: `${__dirname}/views`
}))

//settings
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
userRoutes.applyRoutes(server);
productRoutes.applyRoutes(server)

server.listen(PORT,()=>{
    console.log(`listen on ${server.name}`, server.url);
})
