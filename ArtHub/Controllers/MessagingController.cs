using Microsoft.AspNetCore.Mvc;

namespace ArtHub.Controllers
{
    public class MessagingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
