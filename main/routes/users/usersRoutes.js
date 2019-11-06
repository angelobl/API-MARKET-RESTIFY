const Route = require('restify-router').Router;
const { Users } = require('../../Bd/db');
const { authUser } = require('./authMidleware');

const usersRoutes = new Route();

usersRoutes.post('/users',(req,res,next)=>{
  try{
    //if(!name)
    Users.push({...req.body})
    res.end(JSON.stringify(Users)) 
  }catch(e){
      console.log(e)
  }
})

usersRoutes.get('/users',(req,res,next)=>{
  // res.setHeader('Content-type', 'application/json')
  // res.writeHead(200)
  res.render('home.pug')
});

usersRoutes.get('/users/:id',authUser,(req,res,next)=>{   
  res.writeHead(201)
  const user = Users.filter((elem)=>elem.id ===req.params.id)[0];
  res.end(JSON.stringify(user)) 
}); 

usersRoutes.put('/users/:id', authUser,(req,res,next)=>{
  try{
    const user = Users.filter((elem)=>elem.id ===req.params.id)[0];
    Users.push({
      ...user,
      ...req.body
    })
    res.end(JSON.stringify(user)) 
  }catch(e){
      console.log(e)
  }
})

module.exports = usersRoutes;
