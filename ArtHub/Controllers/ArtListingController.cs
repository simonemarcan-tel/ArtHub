using ArtHub.Repositories;
using ArtHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace ArtHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtListingController : ControllerBase
    {
        private readonly IArtListingRepository _artListingRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ArtListingController(IArtListingRepository artListingRepository, IUserProfileRepository userProfileRepository)
        {
            _artListingRepository = artListingRepository;
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get(Listing listing)
        {
            return Ok(_artListingRepository.GetAll(listing));
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetListingById(int id)
        {
            var post = _artListingRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [Authorize]
        [HttpGet("userlistings")]
        public IActionResult GetUserListings()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_artListingRepository.GetByUserId(firebaseUserId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Listing listing)
        {
            UserProfile user = GetCurrentUserProfile();


            listing.UserId = user.Id;
            _artListingRepository.Add(listing);
            return CreatedAtAction(
                nameof(GetListingById), new { listing.Id }, listing);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(Listing listing)
        {
            _artListingRepository.Update(listing);
            return NoContent();
        }


        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _artListingRepository.Delete(id);
            return NoContent();
        }

    }
}
