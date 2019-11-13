import React from 'react'
import { Link } from "react-router-dom";

const AddProduct = (props) => (
    <div className='page-container'>
<form className='content'onSubmit={props.handleSubmit}>
    <input type="text" placeholder='Name' name='productName' onChange={props.handleChange} />
    <input type="text" placeholder='Price' name='productPrice' onChange={props.handleChange} />
    <button className="btn waves-effect waves-light">Añadir Producto</button>
</form>
</div>
)

export default AddProduct;