const restify = require('restify');
const render = require('restify-render-middleware');
const corsMiddleware = require('restify-cors-middleware')
const userRoutes = require('./routes/users/usersRoutes');
const productRoutes = require('./routes/products/products.routes');

const PORT = process.env.PORT || 4000;

const server = restify.createServer();

const cors = corsMiddleware({  
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

server.use(render({
  engine: 'pug',
  dir: `${__dirname}/views`
}));

server.pre(cors.preflight);  
server.use(cors.actual);  

// Static files
server.get('/public/*',
  restify.plugins.serveStatic({
    directory: __dirname,
  })
);

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
