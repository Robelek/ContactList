namespace ContactListAPI.Models.DTO
{
    public class ContactDataDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public CategoryType Category { get; set; }
        public string SubCategory { get; set; }

        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
