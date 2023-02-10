import { getToken } from "./authManager";

const apiUrl = "/api/listing";

export const getAllListings = async () => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to retrieve the listings.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getListingDetails = async (id) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to retrieve the listings.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserListings = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/userlistings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to retrieve listings.");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const addListing = async (listing) => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to create a listing.");
    }

    console.log("New Listing made successfully");
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const editListing = async (id, listing) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });

    if (!response.ok) {
      throw new Error("An error occurred while trying to update your listing.");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteListing = async (id) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("An error occurred while trying to remove your listing.");
    }
    
    console.log("Listing deleted successfully");
  } catch (error) {
    throw error;
  }
};