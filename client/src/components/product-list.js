import React from "react";
import { Link } from "react-router-dom";

const ProductList = props => (
  <>
    <Link to="/addproduct">Añadir Producto</Link>
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Owner</th>
        <th>Action</th>
      </tr>
      {props.products.map(prod => (
        <tr>
          <td>{prod._id}</td>
          <td>{prod.name}</td>
          <td>{prod.price}</td>
          <td>{prod.owner}</td>
          <td><button onClick={props.handleDelete} value={prod._id}>Delete</button></td>
        </tr>
      ))}
    </table>
    <Link to="/">Regresar</Link>
  </>
);

export default ProductList;
