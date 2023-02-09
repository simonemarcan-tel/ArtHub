using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using ArtHub.Models;


namespace ArtHub.Repositories
{
    public interface IArtListingRepository
    {
        List<Listing> GetAll();
        Listing GetById(int id);
        List<Listing> GetByUserId(string firebaseId);
        void Add(Listing listing);
        void Update(Listing listing);       
        void Delete(Listing listing);
    }
}
