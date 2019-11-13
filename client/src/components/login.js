import React from 'react'
import { Link } from "react-router-dom";

const Login = (props) => (
    <div className='page-container'>
<form className='content'>
    <input type="text" placeholder='Username' name='owner' onChange={props.handleChange} />
    <Link className="btn waves-effect waves-light" to="/products">Login</Link>
</form>
</div>
)

export default Login;