import React from 'react'
import { Link } from "react-router-dom";

const Login = (props) => (
<form>
    <input type="text" placeholder='Username' name='owner' onChange={props.handleChange} />
    <Link to="/products">Login</Link>
</form>
)

export default Login;