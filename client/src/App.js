import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./components/login";
import ProductList from "./components/product-list";
import AddProduct from "./components/add-product";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: "",
      products: [],
      productName: '',
      productPrice: ''
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(res => this.setState({ products: res }));
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleDelete = event => {
    fetch(`http://localhost:4000/products/${event.target.value}/${this.state.owner}`,{method:"DELETE"}).then(res => alert("Producto Eliminado"))
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:4000/products",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({name: this.state.productName, price: this.state.productPrice,owner:this.state.owner})
})
.then(res => alert("Producto Agregado"))
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Login owner={this.state.owner} handleChange={this.handleChange} />
          )}
        />
        <Route
          exact
          path="/products"
          render={() => (
            <ProductList
              owner={this.state.owner}
              products={this.state.products}
              handleDelete={this.handleDelete}
            />
          )}
        />
        <Route exact path="/addproduct" render={() => (
            <AddProduct handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
          )} />
      </Switch>
    );
  }
}

export default App;
