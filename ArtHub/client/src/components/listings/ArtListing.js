import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Listing } from "reactstrap"
import { Accordion, AccordionDetails, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getAllComments, addComment, deleteComment } from "../../modules/commentManager";
import { getUserListings, deleteListing } from "../../modules/artListingManager";
import { getUserDetailsById } from "../../modules/userProfileManager";

export default function UserListing({ listing }) {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});
  const [listingComments, setListingComments] = useState([])
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = useState("");
  const [openListingDialog, setOpenListingDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listings = await getUserListings();
        setUserListings(listings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserListings();
  }, []);

  const handleListingOpen = () => {
    setOpenListingDialog(true);
  };

  const handleListingClose = () => {
    setOpenListingDialog(false);
  };

  const handleListingDelete = () => {
    deleteListing(listing.id).then(() => {
      console.log("Listing deleted successfully.");
    }).catch(error => {
      console.error(error);
    });
    setOpenListingDialog(false);
  };

  const handleCommentOpen = () => {
    setOpenCommentDialog(true);
  };

  const handleCommentClose = () => {
    setOpenCommentDialog(false);
  };

  const handleCommentDelete = (id) => {
    deleteComment(id).then(() => {
      console.log("Comment deleted successfully.");
    }).catch(error => {
      console.error(error);
    });
    setOpenCommentDialog(false);
  };



  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setUserId(Number(userIdFromLocalStorage));
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      getUserDetailsById(userId)
        .then((userData) => {
          setUser(userData);
        })
    };
  }, [userId]);


  const navigate = useNavigate();

  const handleEditClick = (event) => {
    navigate(`/edit/${listing.id}`)
    window.location.reload()
  }

 



   

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = await getAllComments();
        setListingComments(allComments)
        const listingComments = allComments.filter(comment => comment?.listing?.id === listing?.id);
        setNumberOfComments(listingComments.length)
        setListingComments(listingComments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [listing.id]);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const comment = {
      userId: userId,
      listingId: listing.id,
      comment: newComment,
    };

    try {
      await addComment(comment);
      setNumberOfComments(numberOfComments + 1);
      comment.userProfile = {displayName: user.displayName}
      setListingComments([...listingComments, comment]);
    } catch (error) {
      console.error(error);
    }

    setNewComment("");
  };



  return (

    <Listing className={listing}>
      <h3>{listing.description}</h3>
      <div className="img">
        <img src={listing.imageUrl} alt={listing.description} />
      </div>
     
      <div className="btn-container">
        
        <button
          className="button-comment"
          onClick={(e) => setOpen(!open)}
        >
          <span role="img" aria-label="speech bubble">💬</span> {numberOfComments}
        </button>
        {userListings.find(l => l.id === listing.id) && (
          <>
            <button className="btn-edit"
              onClick={(e) => handleEditClick(e)}><span>✏️</span></button>
            <button className="btn-delete" onClick={handleCardOpen}><span>delete
            </span></button>
          </>
        )}
        <Dialog
          open={openListingDialog}
          onClose={handleListingClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure you want to delete this listing?</DialogTitle>
          <DialogContent>
            <DialogContentText><img src={listing.imageUrl} alt="delete" style={{ maxWidth: "100%", height: "auto" }} /></DialogContentText>
            <br></br>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleListingClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleListingDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {open && (
        <Accordion>
          <center><AccordionDetails style={{ backgroundColor: "#FFB6C1" }}>
            <div className="comments">
              {cardComments.map(comment => (
                <div key={comment.id}>
                  <p>
                    {comment.comment} - {comment.userProfile.displayName}
                    {userId === comment?.userId && (
                      <span className="delete-icon" style={{ cursor: "pointer" }} onClick={handleCommentOpen}>❌</span>
                    )}
                  </p>
                  <Dialog
                    open={openCommentDialog}
                    onClose={handleCommentClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure you want to delete this comment?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>"{comment.comment}" - {comment.userProfile.displayName}</DialogContentText>
                      <br></br>
                      <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCommentClose} color="primary">
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          handleCommentDelete(comment.id);
                        }}
                        color="primary"
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ))}
            </div>

            <form className="input-container" onSubmit={handleSubmit}>
              <input type="text" placeholder="Write a comment" value={newComment} onChange={handleChange} />
              <button className="post-comment-button">Post</button>
            </form>
          </AccordionDetails></center>
        </Accordion>
      )
      }
    </Listing >
  );
}