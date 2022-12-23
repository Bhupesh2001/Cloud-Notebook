import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/notes/AlertContext';

const Signup = () => {
    const context = useContext(AlertContext)
    const {showAlert} = context
    let history = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let {name, email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })
        });
        let json = await response.json();
        // console.log(json)
    
        // Save the auth token
        if(json.success === true)
        {
            showAlert("Signup Successful")
            history("/");
            localStorage.setItem('token', json.authtoken)
        }
        else
            showAlert("Invalid Details")
    
     
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
