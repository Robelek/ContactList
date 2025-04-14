import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { categories, workRoles } from '../misc/CommonData';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function ContactEdit(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const {id} = useParams();
    const [token, setToken] = useState(null);
    let [shouldRefresh, setShouldRefresh]= useState(1);
  
    const [infoMessage,setinfoMessage] = useState("");

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

        console.log(formData);

    }

    let handleEdit = async (e) =>
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
            
            let requestHeaders = {};
            requestHeaders['Authorization'] = `Bearer ${token}`

            axios.put(`${apiUrl}/Users/${id}`, formDataCopy,
                {
                    headers: requestHeaders
                    
                }
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                    setinfoMessage("Successfully edited!")
        
               
                }
            })
            .catch(error => {
                setinfoMessage(`Error! ${error.response.data}`)
            })
        

        } catch (err) {
          
           setError(
            <div> Error: {err.response.data} </div>
        )
        }
    }

    function getToken(_token)
    {
        console.log(`ContactDetails.js - token ${_token}`)
    
        setToken(_token);
    }


    useEffect(() => {

        if(apiUrl === undefined)
        {
            console.error("API_URL is undefined");
        }
        else
        {
             let requestHeaders = {};
            requestHeaders['Authorization'] = `Bearer ${token}`

            axios.get(`${apiUrl}/Users/${id}`,
                {
                    headers: requestHeaders,
                    params: {
                        forEdit: true
                    }
                }
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                   console.log(response.data);
            

                let newFormData = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    category: "",
                    subCategory: "",
                    phoneNumber: "",
                    dateOfBirth: new Date().toISOString(),
                    password: ""
                }
                newFormData.firstName = response.data.firstName;
                newFormData.lastName = response.data.lastName;
                newFormData.email = response.data.email;
                newFormData.category = categories.at(response.data.category).toLowerCase();
                newFormData.subCategory = response.data.subCategory.toLowerCase();
                newFormData.phoneNumber = response.data.phoneNumber;
                newFormData.dateOfBirth = response.data.dateOfBirth;

                console.log(newFormData);

                setFormData(newFormData);
                setinfoMessage("");

                    //setContactData(response.data);
               
                }
               
            })
            .catch(error => {
                let res = error.response;
                if(res.status == HttpStatusCode.Unauthorized)
                    {
                        setinfoMessage("Unauthorized")
                       
                    }
                else if(res.status == HttpStatusCode.NotFound)
                {
                    setinfoMessage("No contact found")
          
                 
                }
            
            })
        }
    
      
    }, [id, shouldRefresh, token])

    
    // category: 0,
    // subCategory: "",
    // phoneNumber: "",
    // dateOfBirth: new Date().toISOString(),

    if(infoMessage != "")
    {
        return (
            <div>
                <NavBar getToken={getToken}>

                </NavBar>
                <h1> EDIT CONTACT PAGE</h1>

                <div>
                    {infoMessage}
                </div>
            </div>
        )
    }
  
    return (
        <div>

            <NavBar getToken={getToken}>

            </NavBar>
        <h1> EDIT CONTACT PAGE</h1>
        
        <form className="loginRegisterForm" onSubmit={handleEdit} autoComplete='on'>
            {error}

            <div>
                <label htmlFor='email'>
                    Email
                </label>
                <input required type="email" name="email" placeholder="test_email@domain.com" value={formData.email} onChange={handleFormChange}/>
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
                <input name="firstName" placeholder="Jan" value={formData.firstName} onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='lastName'>
                    Last name
                </label>
                <input name="lastName" placeholder="Kowalski" value={formData.lastName} onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='dateOfBirth'>
                    Date of birth:
                </label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth.split('T')[0]} onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='phoneNumber'>
                    Phone number
                </label>
                <input type="tel" name="phoneNumber" placeholder="+48 123 456 789" pattern="^\+?[0-9\s\-]{7,15}$" value={formData.phoneNumber} onChange={handleFormChange}/>
            </div>

            <div className='radioHolder'>
                {
                categories.map((category) => (
                    <div key={category}>
                         <label htmlFor={category}>
                            {category}
                        </label>
                        <input type="radio" name="category" checked={category.toLowerCase() == formData.category.toLowerCase()} id={category} value={category.toLowerCase()} onChange={handleFormChange}/>
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
                            <input type="radio" name="subCategory" checked={formData.subCategory.toLowerCase() == workRole.toLowerCase()} id={workRole} value={workRole.toLowerCase()} onChange={handleFormChange}/>
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
                    <input name="subCategory"  onChange={handleFormChange} value={formData.subCategory}/>
                </div>
            )}


            <button type="submit">
                REGISTER
            </button>
        </form>

        </div>
    );
  }
  
  export default ContactEdit;
  