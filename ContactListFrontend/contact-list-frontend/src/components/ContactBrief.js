function ContactBrief(props) {
    let contact = props.contact;
    let link = `details/${contact.id}`;
    let userData = props.userData;

    let handleDelete = () => {
        props.deleteHandleFunction(contact.id);
    }

    let deleteButton = (<></>)

    if(userData != null && userData != undefined)
    {
        if(userData.email == contact.email || userData.role == "Admin")
            {
                deleteButton = (
                    <div className="buttonLink deleteButton" onClick={handleDelete}>
                        DELETE
                    </div>
                )
            }
    }
   

    return (
        <div className="contactBrief">
            <a href={link}>
                <div className="buttonLink">
                    DETAILS
                </div>
            </a>

            <div>
                {contact.email}
            </div>

            <div>
                {contact.category}
            </div>
           
          
            <div>
                {contact.subCategory}
            </div>
            
            {deleteButton}
            
        </div>
    );
  }
  
  export default ContactBrief;
  