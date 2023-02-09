using ArtHub;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System.Collections.Generic;


namespace ArtHub.Repositories
{
    public class ArtListingRepository : BaseRepository, IArtListingRepository
    {
        public ArtListingRepository(IConfiguration configuration) : base(configuration) { }
        
        public List<Listing> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT l.Id, l.Description, l.ImageUrl
                    ul.FirebaseUserId

                    FROM Listing l";
                }

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
                            UserId = DbUtils.GetInt(reader, "UserId")
                        });
                    }
                    return listings;
                }
            }
            
            public Listing GetById(int id)
            { 
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandTezt = @"
                            SELECT l.Description, l.ImageUrl
                            ul.FirebaseUserId
                            FROM Listing l
                            JOIN User up ON l.UserId
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
                                    UserId = DbUtils.GetInt(reader, "UserId")
                                };
                            }
                            return listing;
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
                        SELECT l.Id, l.Description, l.ImageUrl
                        ul.FirebaseUserId
                        FROM Listing l
                        WHERE ul.FirebaseUserId = @firebaseUserId";

                            DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                            using (SqlDataReader = cmd.ExecuteReader())
                            {
                                var listings = new List<listing>();
                                while (reader.Read())
                                {
                                    listings.Add(new Listing()
                                    {
                                        Id = DbUtils.GetInt(reader, "Id"),
                                        Description = DbUtils.GetString(reader, "Description"),
                                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                        UserId = DbUtils.GetInt(reader, "UserId")
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
                            INSERT INTO Card (
                            Description,
                            ImageUrl,
                            UserId
                            )
                            OUTPUT INSERTED.ID

                               VALUES (
                                @Description,
                                @ImageUrl,
                                @UserId)";

                            DbUtils.AddParameter(cmd, "@Description", listing.Description);
                            DbUtils.AddParameter(cmd, "@ImageUrl", listing.ImageUrl);
                            DbUtils.AddParameter(cmd, "@UserId", listing.UserId);

                            listing.Id = (int)cmd.ExecuteScalar();
                        }

                    }
                }
                //this is where we would apply the DELETE and UPDATE functionalities
            } 
        }
    }
}
