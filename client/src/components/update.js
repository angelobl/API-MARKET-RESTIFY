import React from 'react'

const Update = (props) => (
    <div className='page-container'>
<form className='content'onSubmit={props.handleUpdate}>
    <input type="text" placeholder='Name' name='productName' onChange={props.handleChange} value={props.productName} />
    <input type="text" placeholder='Price' name='productPrice' onChange={props.handleChange} value={props.productPrice} />
    <button className="btn waves-effect waves-light">Actualizar Producto</button>
</form>
</div>
)

export default Update;