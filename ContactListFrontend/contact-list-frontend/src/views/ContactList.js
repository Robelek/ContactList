import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ContactBrief from '../components/ContactBrief';

import NavBar from '../components/NavBar';

function ContactList() {
    const [contactBriefs, setContactBriefs] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    let [shouldRefresh, setShouldRefresh]= useState(1);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);


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
                else
                {
                    console.error("No contact briefs found in data");
                    setContactBriefs([]);
                }
            })
            .catch(error => {
                console.error("Error when getting contacts", error);
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

    let contactsBriefComponents = contactBriefs.map(thisContact => 
        (
           <ContactBrief key={thisContact.email} contact={thisContact}/>
        )
    );

    
    return (
        <div>
            <NavBar passUserData={getUserData} getToken={getToken}></NavBar>
        <h1>
            Contact List
        </h1>
        
        <div className='contactList'>
            {contactsBriefComponents}
            
        </div>

        </div>
    );
}

export default ContactList;
