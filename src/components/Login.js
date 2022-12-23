import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/notes/AlertContext';

const Login = () => {
    const context = useContext(AlertContext)
    const {showAlert} = context
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""})

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
        let json = await response.json();
        console.log(json)
        if(json.success)
        {
            // Save the auth token
            showAlert("Login Successful")
            localStorage.setItem('token', json.authtoken)
            history("/");
        }
        else
        {
            showAlert("Login Unsuccessful")
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
