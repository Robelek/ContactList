# ContactList
Web app made for .Net PC recruitment

## Other important files
Descriptions of classes and methods are in the documentation folder.

## How to run?
Simplest way:
1. clone the repo
2. in the contact-list-frontend folder, add a .env (.example_env shows what should be inside)
3. in the ContactListAPI folder, add a .env (.example_env shows what should be inside)
4. run runAll.bat


## How to compile
### Backend (using Visual Studio):
1. open ContactListAPI.sln in the ContactListAPI folder
2. press CTRL+SHIFT+B or right click the solution in explorer and choose build

### Frontend
1. open contact-list-frontend folder in a command line (or visual studio code)
2. write ```npm run build``` 




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
