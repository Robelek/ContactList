import { categories } from "../misc/CommonData";

function ContactBrief(props) {
    let contact = props.contact;
    let categoryName = categories.at(contact.category);
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
                {categoryName}
            </div>
           
            {
                contact.category !== "Personal" && (
                    <div>
                        {contact.subCategory}
                    </div>
                ) 
            }
        </div>
    );
  }
  
  export default ContactBrief;
  