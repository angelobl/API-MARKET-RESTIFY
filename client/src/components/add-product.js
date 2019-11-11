import React from 'react'
import { Link } from "react-router-dom";

const AddProduct = (props) => (
<form onSubmit={props.handleSubmit}>
    <input type="text" placeholder='Name' name='productName' onChange={props.handleChange} />
    <input type="text" placeholder='Price' name='productPrice' onChange={props.handleChange} />
    <button>Añadir Producto</button>
    <Link to="/products">Regresar</Link>
</form>

)

export default AddProduct;