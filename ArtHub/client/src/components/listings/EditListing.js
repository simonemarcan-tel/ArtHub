import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Label, Input } from "reactstrap";

import getUserListings from "../../modules/ListingManager";
import  editListing  from "../../modules/ListingManager";

export default function EditListing() {
    const navigate = useNavigate()
    const { id } = useParams()

    // initial state of object or array will be empty
    const [userChoices, setUserChoices] = useState({
       // id: 0,
        //userProfileId: 0,
        description: "",
        imageUrl: ""
    })

    useEffect(() => {
        getUserListings(id).then(setUserChoices);
    }, [])

    // how the data is held in the form
    const handleInputChange = (event) => {
        const copy = { ...userChoices }
        copy[event.target.id] = event.target.value
        setUserChoices(copy)
    }

    // what will be sent to the api
    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const productToSendToApi = {
            ...userChoices
        }

        return editListing(productToSendToApi)
            .then(() => {
                navigate("/listings")
            })
    }

    return (
        <>

            <center><h1>Edit Listing</h1></center><br></br>

            <FormGroup>
                <Label for="listing">Description</Label>
                <Input
                    id="description"
                    type="text"
                    value={userChoices.description}
                    onChange={handleInputChange}
                />

                <Label for="creature">Image</Label>
                <Input
                    id="imageLocation"
                    type="text"
                    value={userChoices.imageUrl}
                    onChange={handleInputChange}
                />

               
                <Button type="submit" onClick={handleSaveButtonClick}>Update</Button>

                <Button onClick={() => { navigate("/listings") }}>Listing Page</Button>
            </FormGroup>

        </>
    );
}