import { jwtDecode } from 'jwt-decode';
import { getTokenClaimData, isTokenExpired } from '../misc/TokenHandling';
import { useEffect, useState } from 'react';
function NavBar({passUserData, getToken})
{
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
            if(typeof(passUserData) === "function")
            {
                passUserData(null);
            }
            
            if(typeof(getToken) === "function")
            {
                getToken(null);
            }
           
        }
        else
        {
            requestHeaders['Authorization'] = `Bearer: ${token}`
            let tokenData = getTokenClaimData(token);
            console.log(`TokenData: ${tokenData}`)

            setUserData(tokenData);
            if(typeof(passUserData) === "function")
            {
                passUserData(tokenData);
            }
            if(typeof(getToken) === "function")
            {
                getToken(token);
            }
            
        }

    },[shouldRefresh])


    return (
        <nav>
            <a href="/" className="moveToLeft">
                <div className='buttonLink'>
                    HOME
                </div>
            </a>
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
    )
}

export default NavBar;