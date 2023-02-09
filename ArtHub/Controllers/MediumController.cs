using Microsoft.AspNetCore.Mvc;

namespace ArtHub.Controllers
{
    public class MediumController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
