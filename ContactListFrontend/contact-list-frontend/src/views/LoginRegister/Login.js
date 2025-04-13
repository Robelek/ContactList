import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Login(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(<></>);

    let handleFormChange = (e) => {
        let {name, value} = e.target;
        setFormData(prevState => (
        {
            ...prevState,
            [name]: value
        })
        )
    }

    let handleLogin = async (e) =>
    {
        e.preventDefault();

        console.log(formData)

        try {
            const response = await axios.post(`${apiUrl}/Users/login`, formData);
            if (response.status === HttpStatusCode.Ok) {
                let token = response.data.token;
                sessionStorage.setItem("token", token);
                console.log(token);
                navigate('/');
            }
            else
            {
                setError(
                    <div> {response.data} </div>
                )
            }
        

        } catch (err) {
           console.error("Error when trying to log in", err)
        }
    }

    return (
        <div>
        <h1> LOGIN PAGE</h1>
        
        <form className="loginRegisterForm" onSubmit={handleLogin} autoComplete='on'>
            {error}

            <div>
                <label htmlFor='email'>
                    Email
                </label>
                <input required type="email" name="email" placeholder="test_email@domain.com" onChange={handleFormChange}/>
            </div>
        
            <div>
                <label htmlFor='password'>
                    Password
                </label>
                <input required type="password" name="password" placeholder="" onChange={handleFormChange}/>
            </div>

            <button type="submit">
                LOGIN
            </button>
        </form>

        </div>
    );
  }
  
  export default Login;
  