using ArtHub.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace ArtHub.Models
{
    public class Listing
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        [Required]
        public int UserId { get; set; }


    }

    public class ListingMedium
    {
        public int Id { get; set; }
        [Required]
        public int ListingId { get; set; }
        [Required]
        public int MediumId { get; set; }

    }

    public class ListingTag
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public int TagId { get; set; }
    }
}