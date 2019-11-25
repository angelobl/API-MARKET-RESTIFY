import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Login from "./components/login";
import Nav from "./components/nav";
import Register from "./components/register";
import ProductList from "./components/product-list";
import AddProduct from "./components/add-product";
import Update from "./components/update";
import Chat from "./components/chat";

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
      username: "",
      password: "",
      products: [],
      productName: "",
      productId: "",
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
    const json = await res.json();
    alert(json.message);
    const products = await getProducts();
    this.setState({ products: products });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const res = await fetch("http://localhost:4000/products", {
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
    const json = await res.json();
    alert(json.message);
    const products = await getProducts();
    this.setState({ products: products });
    this.setState({ productName: "" });
    this.setState({ productPrice: "" });
  };

  handleUpdateRedirect = event => {
    this.setState({ productId: event.target.dataset.id });
    this.setState({ productName: event.target.dataset.name });
    this.setState({ productPrice: event.target.dataset.price });
    this.props.history.push("/update");
  };

  handleUpdate = async event => {
    event.preventDefault();

    const res = await fetch(
      `http://localhost:4000/products/${this.state.productId}/${this.state.owner}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          name: this.state.productName,
          price: this.state.productPrice
        })
      }
    );
    const json = await res.json();
    alert(json.message);
    const products = await getProducts();
    this.setState({ products: products });
    this.setState({ productName: "" });
    this.setState({ productPrice: "" });
    this.setState({ productId: "" });
  };

  handleLogin = async event => {
    event.preventDefault();
    console.log("logeando");
    const res = await fetch("http://localhost:4000/signin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    const json = await res.json();
    this.setState({ username: "" });
    this.setState({ password: "" });
    if (json.user) {
      this.setState({ owner: json.user });
      this.props.history.push("/products");
    } else if (json.message) {
      alert(json.message);
    }
  };

  handleRegister = async event => {
    event.preventDefault();
    console.log("registrando");
    const res = await fetch("http://localhost:4000/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    const json = await res.json();
    console.log(json);
    alert(json.message);
  };

  handleLogout = () => {
    this.setState({ owner: "" });
  };

  render() {
    return (
      <>
        <Nav handleLogout={this.handleLogout} owner={this.state.owner} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={() => (
              <Register
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}
              />
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
                handleUpdate={this.handleUpdate}
                handleUpdateRedirect={this.handleUpdateRedirect}
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
          <Route
            exact
            path="/update"
            render={() => (
              <Update
                handleUpdate={this.handleUpdate}
                handleChange={this.handleChange}
                productName={this.state.productName}
                productPrice={this.state.productPrice}
              />
            )}
          />
          <Route
            exact
            path="/chat"
            render={() => <Chat owner={this.state.owner} />}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
