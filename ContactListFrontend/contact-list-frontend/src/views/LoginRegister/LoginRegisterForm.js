function LoginRegisterForm(props)
{
    let handleFormChange = props.handleFormChange;
    let handleSubmit = props.handleSubmit;
    let categories = props.categories;
    let subCategories = props.subCategories;
    let formData = props.formData;
    let error = props.error;

    let dateOfBirth

    return (
        <form className="loginRegisterForm" onSubmit={handleSubmit} autoComplete='on'>
            {error}

            <div>
                <label htmlFor='email'>
                    Email
                </label>
                <input required type="email" name="email" value={formData.email} placeholder="test_email@domain.com" onChange={handleFormChange}/>
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
                <input name="firstName" placeholder="Jan" value={formData.firstName} onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='lastName'>
                    Last name
                </label>
                <input name="lastName" placeholder="Kowalski" value={formData.lastName} onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='phoneNumber'>
                    Phone number
                </label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} placeholder="+48 123 456 789" pattern="^\+?[0-9\s\-]{7,15}$" onChange={handleFormChange}/>
            </div>

            <div>
                <label htmlFor='dateOfBirth'>
                    Date of birth:
                </label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth.split('T')[0]} onChange={handleFormChange}/>
            </div>

            <div className='radioHolder'>
                {
                categories.map((category) => (
                    <div key={category.name}>
                         <label htmlFor={category.name}>
                            {category.name}
                        </label>
                        <input type="radio" name="category" checked={category.name.toLowerCase() == formData.category.toLowerCase()} id={category.name} value={category.name.toLowerCase()} onChange={handleFormChange}/>
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
                            <input type="radio" name="subCategory" checked={formData.subCategory.toLowerCase() == workRole.name.toLowerCase()} id={workRole.name} value={workRole.name.toLowerCase()} onChange={handleFormChange}/>
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
                Submit
            </button>
        </form>
    )
}

export default LoginRegisterForm