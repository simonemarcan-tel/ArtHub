import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import UserArtList from "./UserListing";
import ArtAddListing from "./UserListing"; 
import  getUserListings  from "../../modules/ListingManager";


export default ArtAddListing = () => {
    const [listing, setListing] = useState({
        description: "",
        imageUrl: "",
        
    });
    const [listings, setListings] = useState([]);
    const [userListings, setUserListings] = useState([]);

    const getAll = () => {
        getUserListings().then(listings => setListings(listings));
    }

    useEffect(() => {
        getAll();
    }, []);


    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        const listingIds = []
        e.target.artListing.forEach((listing) => {
            console.log(e.target.artListing)
            if (listing.checked) { listingIds.push(listing.id) }
        })
       
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="imageUrl">Image</Label>
                <Input
                    id="imageUrl" placeholder
                    type="text"
                    onChange={(e) => setListing({ ...listing, imageUrl: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input
                    id="description"
                    type="textarea"
                    onChange={(e) => setListing({ ...listing, description: e.target.value })}
                />
            </FormGroup>
            <FormGroup check>
                <Label for="artListing">For Sale</Label>
                {listings.map((p) => {
                    return <><Input
                        type="checkbox"
                        id={p.id}
                        name="listingStatus"
                    />
                        <Label check><img style={{ width: 100 }} src={p.listingLocation} /></Label></>
                })}
            </FormGroup>
            <FormGroup>
                <Button>Add Listing</Button>
            </FormGroup>
        </Form>
    )
}