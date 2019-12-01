import React from "react";
import { Link } from "react-router-dom";

const arrayBufferToBase64 = buffer => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const ProductList = props => (
  <div style={{ padding: "50px" }}>
    {console.log("i am rendering")}
    <table>
    <tbody>
      <tr style={{textAlign:"center"}}>
        <th>Id</th>
        <th>Picture</th>
        <th>Name</th>
        <th>Price</th>
        <th>Owner</th>
        <th>Video</th>
        <th>Action</th>
      </tr>
      {
      props.products.map(prod => (
        <tr key={prod._id}>
          <td>{prod._id}</td>
          <td>
            <img
              src={`data:${prod.image.contentType};base64,${arrayBufferToBase64(
                prod.image.data.data
              )}`}
              style={{ maxHeight: "300px", maxWidth: "300px" }}
            />
          </td>
          <td>{prod.name}</td>
          <td>{prod.price}</td>
          <td>{prod.owner}</td>
          <td>
            <video
              src={`data:${prod.video.contentType};base64,${arrayBufferToBase64(
                prod.video.data.data
              )}`}
              style={{ maxHeight: "300px", maxWidth: "300px" }}
              controls
            >
              <source type="video/mp4"></source>
            </video>
          </td>
          <td>
            <button
              onClick={props.handleDelete}
              value={prod._id}
              className="btn-floating btn-large waves-effect waves-light red"
            >
              X
            </button>
            <div
              onClick={props.handleUpdateRedirect}
              data-id={prod._id}
              data-name={prod.name}
              data-price={prod.price}
              data-image={`data:${prod.image.contentType};base64,${arrayBufferToBase64(
                prod.image.data.data
              )}`}
              data-video={`data:${prod.video.contentType};base64,${arrayBufferToBase64(
                prod.video.data.data
              )}`}
              className="btn-floating btn-large waves-effect waves-light yellow"
            >
              X
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
);

export default ProductList;
