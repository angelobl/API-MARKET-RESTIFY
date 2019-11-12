const Users = [
  {
    id:'owner1',
    name:'Mayte',
    email:'mayte@gmail.com',
    password:'noveasmipassword'
  },
  {
    id:'owner2',
    name:'Helen',
    email:'helen@gmail.com',
    password:'helen123'
  }
];
const Products =[
  {
    id:'product1',
    name:'casaca',
    price:'80',
    currency:'USD',
    owner:'owner1'
  },
  {
    id:'product2',
    name:'zapatillas',
    price:'120',
    currency:'USD',
    owner:'owner2'
  }
]

module.exports = {
  Users,
  Products,
}