import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

function Register(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

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

    }

    let handleRegister = async (e) =>
    {
        e.preventDefault();

        console.log(formData)

        try {
            
            let formDataCopy = structuredClone(formData);
            if(formDataCopy.category == "Private")
            {
                formDataCopy.subCategory = "";
            }
            

            const registerResponse = await axios.post(`${apiUrl}/Users`, formDataCopy);
            if (registerResponse.status === HttpStatusCode.Ok) {

                const loginResponse = await axios.post(`${apiUrl}/Users/login`, {
                        email: formDataCopy.email,
                        password: formDataCopy.password
                    }
                );

                if(loginResponse.status === HttpStatusCode.Ok)
                {
                    let token = loginResponse.data.token;
                    sessionStorage.setItem("token", token);
                    console.log(token);
                    navigate('/');
                }
                
            }
        

        } catch (err) {
          
           setError(
            <div> Error: {err.response.data} </div>
        )
        }
    }

    let [shouldRefresh, setShouldRefresh]= useState(1);
    useEffect(() => {

        if(apiUrl === undefined)
        {
            console.error("API_URL is undefined");
        }
        else
        {
           
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
  

    

    if (categories == [] || subCategories == [])
    {
        return <div>
            <NavBar>

            </NavBar>

            <h1> REGISTER PAGE </h1>
            <div>
                Technical difficulties: couldn't obtain the categories.
            </div>
        </div>
    }

    let workCategory = categories.find(cat => cat.name == "Work");
    let workRoles = subCategories.filter(subCat => subCat.categoryId === workCategory.id);

    return (
        <div>

            <NavBar>

            </NavBar>
        <h1> REGISTER PAGE</h1>
        
        <form className="loginRegisterForm" onSubmit={handleRegister} autoComplete='on'>
            {error}

            <div>
                <label htmlFor='email'>
                    Email
                </label>
                <input required type="email" name="email" placeholder="test_email@domain.com" onChange={handleFormChange}/>
            </div>
        
            <div>
                <label htmlFor='password'>
                    Password
                </label>
                <input required type="password" name="password" placeholder="" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='firstName'>
                    First name
                </label>
                <input name="firstName" placeholder="Jan" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='lastName'>
                    Last name
                </label>
                <input name="lastName" placeholder="Kowalski" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='phoneNumber'>
                    Phone number
                </label>
                <input type="tel" name="phoneNumber" placeholder="+48 123 456 789" pattern="^\+?[0-9\s\-]{7,15}$" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='dateOfBirth'>
                    Date of birth:
                </label>
                <input type="date" name="dateOfBirth" onChange={handleFormChange}/>
            </div>

            <div className='radioHolder'>
                {
                categories.map((category) => (
                    <div key={category.name}>
                         <label htmlFor={category.name}>
                            {category.name}
                        </label>
                        <input type="radio" name="category" id={category.name} value={category.name.toLowerCase()} onChange={handleFormChange}/>
                    </div>
                ))
               }

               
            </div>
         

            {formData.category === "work" && (
                <div className="radioHolder">
                        {
                    subCategories.map((workRole) => (
                        <div key={workRole.name}>
                            <label htmlFor={workRole.name}>
                                {workRole.name}
                            </label>
                            <input type="radio" name="subCategory" id={workRole.name} value={workRole.name.toLowerCase()} onChange={handleFormChange}/>
                        </div>
                    ))
                }
                </div>
            )}

            {formData.category === "other" && (
                <div>
                     <label htmlFor='subCategory'>
                    Subcategory
                    </label>
                    <input name="subCategory"  onChange={handleFormChange}/>
                </div>
            )}


            <button type="submit">
                REGISTER
            </button>
        </form>

        </div>
    );
  }
  
  export default Register;
  