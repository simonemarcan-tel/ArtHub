using Microsoft.AspNetCore.Mvc;
using ArtHub.Repositories;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Security.Claims;

namespace ArtHub.Controllers
{
    public class ListingCommentController : Controller
    {
        private readonly IListingCommentRepository _listingCommentRepository;
        
            
        
        public IActionResult Index()
        {
            return View();
        }
    }
}
