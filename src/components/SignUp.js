import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the Auth token and redirect
      localStorage.setItem('token', json.authToken);
      showAlert("This user is Already Exist", "success")
      navigate("/");
    }

    else {
      // alert("This user is Already Exist");
      showAlert("This user is Already Exist", "danger")
    }




  };
  const onChangeData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label" >Name</label>
          <input type="name" className="form-control" value={credentials.name} onChange={onChangeData} id="name" name='name' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChangeData} id="email" name='email' aria-describedby="emailHelp" minLength={5} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChangeData} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default SignUp
