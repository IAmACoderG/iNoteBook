import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the Auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
        }

        else {
            // alert("Invalid Credentials");
            showAlert("Invalid Credentials", "danger")
        }


    };
    const onChangeData = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }


    return (
        <>
        <h1 className='mt-2 text-center'>iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChangeData} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChangeData}  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}
export default Login
