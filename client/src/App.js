import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./components/login";
import ProductList from "./components/product-list";
import AddProduct from "./components/add-product";

const getProducts = async () => {
  const response = await fetch("http://localhost:4000/products");
  const products = await response.json();
  return products;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: "",
      products: [],
      productName: "",
      productPrice: ""
    };
  }

  async componentDidMount() {
    const products = await getProducts();
    this.setState({ products: products });
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleDelete = async event => {
    const res = await fetch(
      `http://localhost:4000/products/${event.target.value}/${this.state.owner}`,
      { method: "DELETE" }
    );
    console.log(res)
    if (res.status === 500) alert("Usuario no es owner");
    else alert("Producto Eliminado");
    const products = await getProducts();
    this.setState({ products: products });
  };

  handleSubmit = async event => {
    event.preventDefault();

    await fetch("http://localhost:4000/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.productName,
        price: this.state.productPrice,
        owner: this.state.owner
      })
    });
    alert("Producto Agregado");
    const products = await getProducts();
    this.setState({ products: products });
  };

  handleUpdate = () => {

  }

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
        <Route
          exact
          path="/addproduct"
          render={() => (
            <AddProduct
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
