using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;

namespace ArtHub.Models
{
    public class ListingComment
    {
        public int Id { get; set; }

        [Required]
        public string Comment { get; set; }

        [DisplayName("Listing")]

        public int ListingId { get; set; }
        public Listing Listing { get; set; }

        [DisplayName("User")]
        public int UserId { get; set; }
    }
}