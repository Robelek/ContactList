import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LoginRegisterForm from './LoginRegister/LoginRegisterForm';

function UserAddView(props) {
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

                navigate('/');
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

            <h1> ADD USER PAGE </h1>
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
        <h1> ADD USER PAGE</h1>
        
        <LoginRegisterForm 
            handleFormChange={handleFormChange}
            handleSubmit={handleRegister}
            categories={categories}
            subCategories={subCategories}
            formData = {formData}
            error = {error}
        />

        </div>
    );
  }
  
  export default UserAddView;
  