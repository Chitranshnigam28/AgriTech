import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        
      })

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        console.log(result.message); 
      }
    } catch (error) {
      console.log(error)
    } finally {
      setFormData({
        email: "",
        password: ""
      })
    }
  }
  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant='dark' type='submit' className='w-100'>Login Up</Button>
      </Form>
    </div>
  )
}

export default Login