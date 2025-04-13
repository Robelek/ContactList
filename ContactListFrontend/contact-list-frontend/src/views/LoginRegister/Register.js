import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { categories, workRoles } from '../../misc/CommonData';

function Register(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

  


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        category: "",
        subCategory: "",
        phoneNumber: "",
        dateOfBirth: new Date().toISOString(),
        password: ""
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

    let handleRegister = async (e) =>
    {
        e.preventDefault();

        console.log(formData)

        try {
            
            let formDataCopy = structuredClone(formData);
            if(formDataCopy.category == "Private")
            {
                formDataCopy.subCategory = "";
            }
            formDataCopy.category = categories.indexOf(formDataCopy.category);
            

            const registerResponse = await axios.post(`${apiUrl}/Users`, formDataCopy);
            if (registerResponse.status === HttpStatusCode.Ok) {

                const loginResponse = await axios.post(`${apiUrl}/Users/login`, {
                        email: formDataCopy.email,
                        password: formDataCopy.password
                    }
                );

                if(loginResponse.status === HttpStatusCode.Ok)
                {
                    let token = loginResponse.data.token;
                    sessionStorage.setItem("token", token);
                    console.log(token);
                    navigate('/');
                }
                else
                {
                    setError(
                        <div> Registering was successful, error when logging in: {loginResponse.data} </div>
                    )
                }
                
            }
            else
            {
                setError(
                    <div> Error when registering: {registerResponse.data} </div>
                )
            }
        

        } catch (err) {
           //console.error("Error when trying to register", err)
           setError(
            <div> Error when registering: {err.response.data} </div>
        )
        }
    }

    
    // category: 0,
    // subCategory: "",
    // phoneNumber: "",
    // dateOfBirth: new Date().toISOString(),
  
    return (
        <div>
        <h1> REGISTER PAGE</h1>
        
        <form className="loginRegisterForm" onSubmit={handleRegister} autoComplete='on'>
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

            <div>
                <label htmlFor='firstName'>
                    First name
                </label>
                <input name="firstName" placeholder="Jan" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='lastName'>
                    Last name
                </label>
                <input name="lastName" placeholder="Kowalski" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='phoneNumber'>
                    Phone number
                </label>
                <input type="tel" name="phoneNumber" placeholder="+48 123 456 789" pattern="^\+?[0-9\s\-]{7,15}$" onChange={handleFormChange}/>
            </div>

            <div className='radioHolder'>
                {
                categories.map((category) => (
                    <div key={category}>
                         <label htmlFor={category}>
                            {category}
                        </label>
                        <input type="radio" name="category" id={category} value={category.toLowerCase()} onChange={handleFormChange}/>
                    </div>
                ))
               }

               
            </div>
         

            {formData.category === "work" && (
                <div className="radioHolder">
                        {
                    workRoles.map((workRole) => (
                        <div key={workRole}>
                            <label htmlFor={workRole}>
                                {workRole}
                            </label>
                            <input type="radio" name="subCategory" id={workRole} value={workRole.toLowerCase()} onChange={handleFormChange}/>
                        </div>
                    ))
                }
                </div>
            )}

            {formData.category === "other" && (
                <div>
                     <label htmlFor='subCategory'>
                    Subcategory
                    </label>
                    <input name="subCategory"  onChange={handleFormChange}/>
                </div>
            )}


            <button type="submit">
                REGISTER
            </button>
        </form>

        </div>
    );
  }
  
  export default Register;
  