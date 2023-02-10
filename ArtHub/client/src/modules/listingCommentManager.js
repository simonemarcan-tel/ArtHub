import { getToken } from "./authManager";

const apiUrl = "/api/listingcomment";

export const getAllComments = async () => {
  try {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to fetch listing comments.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const addComment = async (listingcomment) => {
    try {
      const token = await getToken();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingcomment),
      });
  
      if (!response.ok) {
        throw new Error("An error occurred while trying to add your comment");
      }
  
      console.log("New comment added");
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  export const deleteComment = async (listingcommentId) => {
    try {
      const token = await getToken();
      const response = await fetch(`${apiUrl}/${listingcommentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred while trying to remove the comment");
      }

      console.log("Comment removed successfully");
    } catch (error) {
      throw error;
    }
};
    
    