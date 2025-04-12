import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ContactBrief from '../components/ContactBrief';
import { jwtDecode } from 'jwt-decode';
import { getTokenClaimData, isTokenExpired } from '../miscFunctions/TokenHandling';

function ContactList() {
    const [contactBriefs, setContactBriefs] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    let [shouldRefresh, setShouldRefresh]= useState(1);

    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
    }

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
        }
    
      
    }, [shouldRefresh])

    let contactsBriefComponents = contactBriefs.map(thisContact => 
        (
           <ContactBrief key={thisContact.email} contact={thisContact}/>
        )
    );

    
    return (
        <div>
            <nav>
                {userData === null? (
                    <>
                        <a href="/login">
                            <div className='buttonLink'> LOGIN </div>
                        </a>
 
                        <a href="/register">
                            <div className='buttonLink'> REGISTER </div>
                        </a>
                    </>
                    )
                    :
                    (
                    <>
                        <div>
                            <span>
                            Logged in as {userData.email}
                            </span>
                            
                        </div>
                        <div>
                            <a href="/">
                                <div className='buttonLink' onClick={handleLogout}> logout </div>
                            </a>
                        </div>
                    </>
                    
                    )
                }
               
            </nav>
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
