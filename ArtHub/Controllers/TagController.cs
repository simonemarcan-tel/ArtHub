using Microsoft.AspNetCore.Mvc;

namespace ArtHub.Controllers
{
    public class TagController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
