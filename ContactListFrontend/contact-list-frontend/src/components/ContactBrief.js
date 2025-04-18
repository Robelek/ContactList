function ContactBrief(props) {
    let contact = props.contact;
    console.log(contact);
    let link = `details/${contact.id}`;
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
            
            
        </div>
    );
  }
  
  export default ContactBrief;
  