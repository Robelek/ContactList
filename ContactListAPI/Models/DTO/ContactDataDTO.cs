namespace ContactListAPI.Models.DTO
{
    public class ContactDataDTO
    {
        public Guid ID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string Category { get; set; }
        public string SubCategory { get; set; }

        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
