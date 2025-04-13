import { categories } from "../misc/CommonData";
import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ContactBrief from '../components/ContactBrief';
import { jwtDecode } from 'jwt-decode';
import { getTokenClaimData, isTokenExpired } from '../misc/TokenHandling';
import { useParams } from "react-router-dom";

function ContactDetails(props) {
    let [shouldRefresh, setShouldRefresh]= useState(1);
    const [userData, setUserData] = useState(null);
    const [contactData, setContactData] = useState(null);

    const {id} = useParams();

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        let requestHeaders = {};
        if(isTokenExpired(token))
        {
            sessionStorage.removeItem("token");
            console.log("Token expired");
            setUserData(null);
        }
        else
        {
            requestHeaders['Authorization'] = `Bearer: ${token}`
            let tokenData = getTokenClaimData(token);
            console.log(`TokenData: ${tokenData}`)
            setUserData(tokenData);
        }


        if(apiUrl === undefined)
        {
            console.error("API_URL is undefined");
        }
        else
        {
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
                else
                {
                    console.error("No contact data found in data");
                    setContactData([]);
                }
            })
            .catch(error => {
                console.error("Error when getting contact data", error);
            })
        }
    
      
    }, [id, shouldRefresh])


    let details = (<div> No contact data found </div>);
  
    if(contactData !== null)
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
        {details}
        </>
       
    );
  }
  
  export default ContactDetails;
  