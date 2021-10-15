import { useModal } from "../context/Modal"
import { removePostThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts";
import { useDispatch } from "react-redux";
import './EditDeleteCommentModal.css'

function EditDeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteComment = async () => {
        // await dispatch(removePostThunk(postId));
        // await dispatch(getSessionUsersPostsThunk());
        // closeModal();
        console.log(comment)
    }
    
    const editComment = async () => {
        // await dispatch(removePostThunk(postId));
        // await dispatch(getSessionUsersPostsThunk());
        // closeModal();
    }

    return (
        <div className="editdelete-comment-container">
            <div onClick={editComment} className="edit-comment-button">Edit</div>
            <div onClick={deleteComment} className="delete-comment-button">Delete</div>
            <div onClick={closeModal} className="editdelete-comment-cancel">Cancel</div>
        </div>
    )
}

export default EditDeleteCommentModal
