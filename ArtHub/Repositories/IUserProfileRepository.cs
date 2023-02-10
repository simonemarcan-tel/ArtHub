using ArtHub.Models;
using System.Collections.Generic;

namespace ArtHub.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetUsers();
        UserProfile GetById(int id);
        void Add(UserProfile userProfile);
    }
}
