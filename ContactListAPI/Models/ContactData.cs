using ContactListAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using static System.Net.WebRequestMethods;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ContactListAPI.Models
{
    public enum CategoryType
    {
        Work,
        Private,
        Other
    }

    public enum Role
    {
        User,
        Admin
    }


    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(ID), IsUnique = true)]
    public class ContactData
    {
        [Key]
        public Guid ID { get; set;}

        public string FirstName { get; set; }
        public string LastName { get; set; }

      
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public CategoryType Category { get; set; }
        public string SubCategory { get; set; }

        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth {  get; set; }

        public Role UserRole { get; set; } = Role.User;

        public ContactDataDTO toContactDataDTO()
        {
            ContactDataDTO contactDataDTO = new ContactDataDTO();
            contactDataDTO.FirstName = FirstName;
            contactDataDTO.LastName = LastName;
            contactDataDTO.Email = Email;
            contactDataDTO.Category = Category;
            contactDataDTO.SubCategory = SubCategory;
            contactDataDTO.PhoneNumber = PhoneNumber;
            contactDataDTO.DateOfBirth = DateOfBirth;

            return contactDataDTO; 
        }
       

        public void updateFieldsToMatchDTO(ContactDataDTO contactDataDTO)
        {
            this.FirstName = contactDataDTO.FirstName;
            this.LastName = contactDataDTO.LastName;
            this.Email = contactDataDTO.Email;
            this.Category = contactDataDTO.Category;
            this.SubCategory = contactDataDTO.SubCategory;
            this.PhoneNumber = contactDataDTO.PhoneNumber;
            this.DateOfBirth = contactDataDTO.DateOfBirth;

        }

    }
}
