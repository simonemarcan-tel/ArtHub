using ArtHub.Models;
using ArtHub.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace ArtHub.Repositories
{

    public class ArtListingRepository : BaseRepository, IArtListingRepository
    {
        public ArtListingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Listing> GetAll(Listing listing)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
           SELECT l.Id, l.Description, l.ImageUrl, l.UserId,
                  ul.FireBaseUserId, ul.DisplayName, ul.Email,
                  u.Id, o=u.Name
                    
             FROM Listing l
                  JOIN UserProfile ul ON l.UserId = ul.Id
            WHERE c.CreatedAt <= SYSDATETIME()
         ORDER BY c.CreatedAt DESC
        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var listings = new List<Listing>();
                        while (reader.Read())
                        {
                            listings.Add(new Listing()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Description = DbUtils.GetString(reader, "Description"),
                               
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                   
                                }
                            });
                        }

                        return listings;
                    }
                }
            }
        }


        public Listing GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
        SELECT l.Title, l.Description l.ImageUrl,
                 
                  ul.FireBaseUserId, ul.DisplayName, ul.Email,
                  u.Id, u.Name
        FROM Listing l
                  JOIN UserProfile up ON l.UserId = ul.Id
                
            WHERE l.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Listing listing = null;
                        if (reader.Read())
                        {
                            listing = new Listing()
                            {
                               
                                Description = DbUtils.GetString(reader, "Description"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                               
                                
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                   
                                },
                               
                            };
                        }
                        return listing;
                    }
                }
            }
        }


        public List<Listing> GetByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
           SELECT l.Id, l.Description, l.ImageUrl, l.UserId, 
                  ul.FireBaseUserId, ul.DisplayName, ul.Email,
                  u.Id, u.Name
             FROM Listing l
                  JOIN UserProfile up ON l.UserId = ul.Id
                
            WHERE up.FireBaseUserId = @firebaseUserId
        ";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var listings = new List<Listing>();
                        while (reader.Read())
                        {
                            listings.Add(new Listing()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                               
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    
                                },
                               
                            });
                        }

                        return listings;
                    }
                }
            }
        }


        public void Add(Listing listing)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Listing(
                       
                        Description,
                        ImageUrl,
                       
                       
                        UserId,
                       
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        
                        @Description,
                        @ImageUrl,
                      
                        @UserId,
                        )
                    ";

                   
                    DbUtils.AddParameter(cmd, "@Description", listing.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", listing.ImageUrl);
                  
                    DbUtils.AddParameter(cmd, "@UserId", listing.UserId);
                    

                    listing.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Listing listing)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Listing
                SET 
                    Description = @Description,
                    ImageUrl = @ImageUrl,
                   
                    UserId = @UserId,
                   
                WHERE Id = @Id
            ";

                  
                    DbUtils.AddParameter(cmd, "@Description", listing.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", listing.ImageUrl);
                   
                    DbUtils.AddParameter(cmd, "@UserId", listing.UserId);
                  
                    DbUtils.AddParameter(cmd, "@Id", listing);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM Listing
                WHERE Id = @Id
            ";

                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}

