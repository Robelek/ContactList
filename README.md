# ContactList
Web app made for .Net PC recruitment

## Other important files
Descriptions of classes and methods are in the documentation folder.

## How to run?
Simplest way:
<ol>
    <li> clone the repo </li>
    <li> in the contact-list-frontend folder, add a .env (.example_env shows what should be inside) </li>
    <li> in the ContactListAPI folder, add a .env (.example_env shows what should be inside) </li>
    <li> compile the backend (instructions below) in Release mode </li>
    <li> run runAll.bat </li>

</ol>


## How to compile
### Backend (using Visual Studio):
<ol>
    <li> open ContactListAPI.sln in the ContactListAPI folder </li>
    <li> press CTRL+SHIFT+B or right click the solution in explorer and choose build </li>
</ol>

### Frontend
<ol>
    <li> open contact-list-frontend folder in a command line (or Visual Studio Code)
    <li> write ```npm run build``` </li> 
</ol>





## Used libraries and technologies
Frontend:
- HTML+CSS+JS
- React
- axios
- jwt-decode

Backend:
- BCrypt.Net-Next
- DotNetEnv
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.AspNetCore.OpenApi
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.Extensions.Configuration.UserSecrets
- Swashbuckle.AspNetCore 
