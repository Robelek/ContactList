import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ContactBrief from '../components/ContactBrief';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function ContactList() {
    const [contactBriefs, setContactBriefs] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    let [shouldRefresh, setShouldRefresh]= useState(1);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [errorMessage, setErrorMessage] = useState(<></>);

    const navigate = useNavigate();

    function getUserData(userData)
    {
        setUserData(userData);
        console.log(userData);
    }

    function getToken(_token)
    {
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
            axios.get(`${apiUrl}/Users`,
                {
                    headers: requestHeaders
                }
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                   console.log(response.data);
                    setContactBriefs(response.data);
               
                }
            })
            .catch(error => {
                console.error("Error when getting contacts", error);
                setContactBriefs([]);
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
    
      
    }, [shouldRefresh])

    let handleDeleteContact = (id) => {
        let requestHeaders = {};
        requestHeaders['Authorization'] = `Bearer ${token}`
        axios.delete(`${apiUrl}/Users/${id}`,
            {
                headers: requestHeaders
            }
        )
        .then(response => {
            console.log(response);
            if(response.status == HttpStatusCode.Ok)
            {

                if(userData.role != "Admin")
                {
                    sessionStorage.removeItem("token");
                    setToken(null);
                }

                window.location.reload();


            }
        })
        .catch(error => {
            console.error("Error when deleting", error);
            setErrorMessage(error);
        })

    }

    let contactsBriefComponents = contactBriefs.map(thisContact => 
        (
           <ContactBrief key={thisContact.email} contact={thisContact} userData={userData} deleteHandleFunction={handleDeleteContact}/>
        )
    );

    
    return (
        <div>
            <NavBar passUserData={getUserData} getToken={getToken}></NavBar>
        <h1>
            Contact List
        </h1>
        
        {errorMessage}

        <div className='contactList'>
            {contactsBriefComponents}
            
        </div>

        </div>
    );
}

export default ContactList;
