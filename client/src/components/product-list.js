import React from "react";
import { Link } from "react-router-dom";

const ProductList = props => (
  <div style={{padding:"50px"}}>
    <table >
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
          <td>
            <button onClick={props.handleDelete}
              value={prod._id}
              className="btn-floating btn-large waves-effect waves-light red">
            X</button>
            <button onClick={props.handleUpdateRedirect}
              data-id={prod._id}
              data-name={prod.name}
              data-price={prod.price}
              className="btn-floating btn-large waves-effect waves-light yellow">
            X</button>
            
          </td>
        </tr>
      ))}
    </table>
    
  </div>
);

export default ProductList;
