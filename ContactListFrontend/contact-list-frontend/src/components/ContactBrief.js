
function ContactBrief(props) {
    let contact = props.contact;
    return (
        <div className="contactBrief">
            
            <div>
                {contact.email}
            </div>
            <div>
                {contact.firstName + " "} {contact.lastName}
            </div>
            <div>
                {contact.phoneNumber}
            </div>
        </div>
    );
  }
  
  export default ContactBrief;
  