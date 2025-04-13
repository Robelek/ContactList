import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token)
{
    console.log(`isTokenExpired:`);
    console.log(typeof(token));
    console.table(token);
    if(token == null || token == undefined)
    {
        return true;
    }

    try
    {
        const decodedToken = jwtDecode(token);
        const timeNow = Date.now()/1000.0;

        return decodedToken.exp < timeNow;
    }
    catch(error)
    {
        console.error("Error when decoding token", error);
        return true;
    }
}

export function getTokenClaimData(token)
{
    if(token === null || token === undefined)
        {
            return null;
        }
    
        try
        {
            const decodedToken = jwtDecode(token);
            
            let email = decodedToken.email;
            let role = decodedToken.role;

            return {email, role};
        }
        catch(error)
        {
            console.error("Error when decoding token", error);
            return null;
        }
}