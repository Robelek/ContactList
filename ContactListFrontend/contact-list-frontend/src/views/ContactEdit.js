import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LoginRegisterForm from './LoginRegister/LoginRegisterForm';

function ContactEdit(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const {id} = useParams();
    const [token, setToken] = useState(null);
    let [shouldRefresh, setShouldRefresh]= useState(1);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

  
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
                newFormData.category = response.data.category.toLowerCase();
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
                if(error == undefined || error.response == undefined)
                {
                    console.log("error undefined");
                    console.log(error);
                }

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


            axios.get(`${apiUrl}/Misc/categories`,
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                   console.log(response.data);
                    setCategories(response.data);
               
                }
            })
            .catch(error => {
                console.error("Error when getting categories", error);
                setCategories([]);
            })


            axios.get(`${apiUrl}/Misc/subcategories`,
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                   console.log(response.data);
                    setSubCategories(response.data);
               
                }
            })
            .catch(error => {
                console.error("Error when getting subcategories", error);
                setSubCategories([]);
            })

            
        }
    
      
    }, [id, shouldRefresh, token])

    


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
        
        <LoginRegisterForm 
            handleFormChange={handleFormChange}
            handleSubmit={handleEdit}
            categories={categories}
            subCategories={subCategories}
            formData = {formData}
            error = {error}
        />

        </div>
    );
  }
  
  export default ContactEdit;
  