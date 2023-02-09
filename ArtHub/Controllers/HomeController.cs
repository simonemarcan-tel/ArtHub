using Microsoft.AspNetCore.Mvc;

namespace ArtHub.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
