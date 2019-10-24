const Users = [
  {
    id:'123456789',
    name:'Mayte',
    email:'mayte@gmail.com',
    password:'noveasmipassword'
  },
  {
    id:'987654321',
    name:'Helen',
    email:'helen@gmail.com',
    password:'helen123'
  }
];
const Products =[
  {
    name:'casaca',
    price:'80',
    currency:'USD',
    owner:'123456789'
  },
  {
    name:'zapatillas',
    price:'120',
    currency:'USD',
    owner:'987654321'
  }
]

module.exports = {
  Users,
  Products,
}