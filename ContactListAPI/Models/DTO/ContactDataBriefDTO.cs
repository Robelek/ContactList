﻿namespace ContactListAPI.Models.DTO
{
    public class ContactDataBriefDTO
    {
        public Guid ID { get; set; }
        public string Email { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
    }
}
