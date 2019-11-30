import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { Redirect } from "react-router";

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

const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.exampleRef = React.createRef();

    this.state = {
      owner: "",
      username: "",
      password: "",
      products: [],
      productName: "",
      productId: "",
      productPrice: "",
      prediction: [],
      fileImage: null,
      fileVideo:null,
      blob:null
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

    //Validaciones
    if (!this.state.productName || !this.state.productPrice) {
      alert("Insert all fields");
      return;
    }
    if (!this.state.prediction || !this.state.fileImage || !this.state.fileVideo) {
      alert("Insert an image");
      return;
    }

    //.filter(p => p.confidence > 0.3 )
    console.log(this.state.prediction);

    const productNames = this.state.productName.split(" ");
    console.log(productNames);
    const predictions = this.state.prediction.map(p => p.label);

    const matches = predictions.filter(p => {
      for (var i = 0; i < productNames.length; i++) {
        if (productNames[i] === "") return false;
        if (p.includes(productNames[i].toLowerCase())) return true;
      }
    });

    console.log(matches.length);

    if (!matches.length) {
      alert("Insert an image that matches your product");
      return;
    }

    //Post request
    /*
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
    const json1 = await res.json();
    */

    const formData = new FormData();

    formData.set('enctype','multipart/form-data')
    formData.append('image', this.state.fileImage);
    formData.append('video', this.state.fileVideo);
    formData.append('name', this.state.productName);
    formData.append('price', this.state.productPrice);
    formData.append('owner', this.state.owner);

    const res2 = await fetch("http://localhost:4000/products", {
      method: "POST",
      body: formData
    })
    const json2 = await res2.json();
    console.log(json2);

    
    const products = await getProducts();

    
    this.setState({ products: products });
    this.setState({ productName: "" });
    this.setState({ productPrice: "" });

    alert(json2.message)
    /*
    
    */
  };

  handleUpdateRedirect = event => {
    this.setState({ productId: event.target.dataset.id });
    this.setState({ productName: event.target.dataset.name });
    this.setState({ productPrice: event.target.dataset.price });
    this.props.history.push("/update");
  };

  handleUpdate = async event => {
    event.preventDefault();

    if (!this.state.productName || !this.state.productPrice) {
      alert("Insert all fields");
      return;
    }

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
    this.props.history.push("/products");
  };

  handleLogin = async event => {
    event.preventDefault();

    /*
    const res = await fetch("http://localhost:4000/products/image/file")
    const json = await res.json();
    console.log(json);
    

  const base64 = arrayBufferToBase64(json.data.data)
  const base64Flag = 'data:image/jpeg;base64,';
    console.log(base64)
    this.setState({blob:base64Flag+base64})
    */
    

    
    console.log("logeando");
    const res = await fetch("http://localhost:4000/users/signin", {
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

    if (!this.state.username || !this.state.password) {
      alert("Insert all fields");
      return;
    }

    const res = await fetch("http://localhost:4000/users/signup", {
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
    this.props.history.push("/");
  };

  handleLogout = () => {
    this.setState({ owner: "" });
  };

  handleFile = file => {
    console.log(file);
    this.setState({ file: file });
  };

  handleResults = results => {
    console.log(results);
    this.setState({ prediction: results });
  };

  handleFiles = (key,value) => {
    this.setState({[key]:value})
  }

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
                blob={this.state.blob}
                exampleRef={this.exampleRef}
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
          {this.state.owner ? (
            <>
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
                    handleFiles={this.handleFiles}
                    handleResults={this.handleResults}
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
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
