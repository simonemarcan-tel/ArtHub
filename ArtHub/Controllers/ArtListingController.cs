using Microsoft.AspNetCore.Mvc;
using ArtHub.Models;
using ArtHub.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;

namespace ArtHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtListingController : Controller
    {
        private readonly IArtListingRepository _artListingRepository;
        public ArtListingController(IArtListingRepository artListingRepository)
        {
            _artListingRepository = artListingRepository;
        }

        [Authorize]
        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_artListingRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]

        public IActionResult GetArtListingById(int id)
        {
            var listing = -ArtListingRepository.GetById(id);
            if (listing == null)
            {
                return NotFound();
            }
            return Ok(listing);
        }

        [Authorize]
        [HttpGet("userlistings")]

        public IActionResult GetUserListings()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_artListingRepository.GetByUserId(firebaseUserId));

        }

       //this is where we would implement the logic to "Post" a user's profile
        public IActionResult Index()
        {
            return View();
        }
    }
}
