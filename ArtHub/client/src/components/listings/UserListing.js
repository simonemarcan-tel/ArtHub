import React, { useEffect, useState } from "react";
//import Listing from "./Listings";
import { getUserListings } from "../../modules/artListingManager";
import './ArtListing.css';
import { Pagination } from "../ui/Pagination";

export default function UserArtList() {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ListingsPerPage = 15;


    useEffect(() => {
        getUserListings().then(setListings);
}, []);

   
    const indexOfLastListing = currentPage * ListingsPerPage;
    const indexOfFirstListing = indexOfLastListing - ListingsPerPage;
    const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

    return (
        <>
            {listings.length > 0 ? (
                <>
                    <h1 className="text-center">My Listings</h1>
                    <section>
                        <div className="lstng-container">
                            {currentListings.map((l) => (
                                <Listing key={l.id} listing={l} />
                            ))}
                        </div>
                    </section>
                    <Pagination
                        listingsPerPage={listingsPerPage}
                        totalListings={filteredListings.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            ) : (
                <p>No listings yet!</p>
            )}
        </>
    );
}