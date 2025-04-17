using ContactListAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.WebRequestMethods;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ContactListAPI.Models
{
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


        public int CategoryId { get; set; }
        public int SubCategoryID { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public virtual CategoryType Category { get; set; }
        [ForeignKey(nameof(SubCategoryID))]
        public virtual SubCategoryType SubCategory { get; set; }

        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth {  get; set; }

        public Role UserRole { get; set; } = Role.User;

        public ContactDataDTO toContactDataDTO()
        {
            ContactDataDTO contactDataDTO = new ContactDataDTO();
            contactDataDTO.ID = ID;
            contactDataDTO.FirstName = FirstName;
            contactDataDTO.LastName = LastName;
            contactDataDTO.Email = Email;
            contactDataDTO.Category = Category.Name;
            contactDataDTO.SubCategory = SubCategory.Name;
            contactDataDTO.PhoneNumber = PhoneNumber;
            contactDataDTO.DateOfBirth = DateOfBirth;

            return contactDataDTO; 
        }

        public ContactDataBriefDTO toContactDataBriefDTO()
        {
            ContactDataBriefDTO contactDataDTO = new ContactDataBriefDTO();
            contactDataDTO.ID = ID;
            contactDataDTO.Email = Email;
            contactDataDTO.Category = Category.Name;
            contactDataDTO.SubCategory = SubCategory.Name;
          

            return contactDataDTO;
        }

        public void updateFieldsToMatchDTO(ContactDataDTO contactDataDTO, CategoryType category, SubCategoryType subCategory)
        {
            this.ID = contactDataDTO.ID;
            this.FirstName = contactDataDTO.FirstName;
            this.LastName = contactDataDTO.LastName;
            this.Email = contactDataDTO.Email;
            this.Category = category;
            this.SubCategory = subCategory;
            this.PhoneNumber = contactDataDTO.PhoneNumber;
            this.DateOfBirth = contactDataDTO.DateOfBirth;

        }

    }
}
