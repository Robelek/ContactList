import { categories } from "../misc/CommonData";
import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ContactBrief from '../components/ContactBrief';
import { jwtDecode } from 'jwt-decode';
import { getTokenClaimData, isTokenExpired } from '../misc/TokenHandling';
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function ContactDetails(props) {
    let [shouldRefresh, setShouldRefresh]= useState(1);

    const [contactData, setContactData] = useState(null);
    const [token, setToken] = useState(null);

    function getToken(_token)
    {
        console.log(`ContactDetails.js - token ${_token}`)
    
        setToken(_token);
    }

    const {id} = useParams();

    const apiUrl = process.env.REACT_APP_API_URL;

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
                    headers: requestHeaders
                }
            )
            .then(response => {
                console.log(response);
                if(response.status == HttpStatusCode.Ok)
                {
                   console.log(response.data);
                    setContactData(response.data);
               
                }
               
            })
            .catch(error => {
                let res = error.response;
                if(res.status == HttpStatusCode.Unauthorized)
                    {
                        setContactData("Unauthorized")
                        console.error("Unauthorized");
                    }
                else if(res.status == HttpStatusCode.NotFound)
                {
                    console.error("No contact data found in data");
                    setContactData([]);
                }
            
            })
        }
    
      
    }, [id, shouldRefresh, token])

   

    let details = (<div> No contact data found </div>);
  
    if(contactData == "Unauthorized")
    {
        details = (<div>You do not have access to the details</div>)       
    }
    else if(contactData !== null)
    {
        let categoryName = categories.at(contactData.category);
        
        let dateOfBirthStamp = new Date(contactData.dateOfBirth);
        //this splits a string that looks like this: 2025-04-12T15:16:08.678 by the time, and gets just the date
        let dateOfBirth = dateOfBirthStamp.toISOString().split('T')[0];

        details = (<div className="contactBrief">
            <div>
                {contactData.email}
            </div>

            <div> 
                {contactData.firstName} {contactData.lastName}
            </div>
    
            <div>
                {categoryName}
            </div>
           
            {
                contactData.category !== "Personal" && (
                    <div>
                        {contactData.subCategory}
                    </div>
                ) 
            }

            <div>
                {contactData.phoneNumber}
            </div>

            <div>
                {dateOfBirth}
            </div>
             </div>)
    }
   

    

   
    return (
        <>
        <NavBar getToken={getToken}>

        </NavBar>

        <main>
        {details}
        </main>
        
        </>
       
    );
  }
  
  export default ContactDetails;
  