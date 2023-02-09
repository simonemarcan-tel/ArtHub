using Microsoft.AspNetCore.Mvc;

namespace ArtHub.Controllers
{
    public class SearchListingsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
