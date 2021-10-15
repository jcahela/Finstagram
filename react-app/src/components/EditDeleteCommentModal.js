import { useModal } from "../context/Modal"
import { removeCommentThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts";
import { getFollowedUsersPostsThunk } from "../store/followedUsersPosts";
import { useDispatch } from "react-redux";
import EditCommentModal from "./EditCommentModal";
import './EditDeleteCommentModal.css'

function EditDeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal, toggleModal, setModalContent } = useModal();

    const deleteComment = async () => {
        await dispatch(removeCommentThunk(comment.id));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getFollowedUsersPostsThunk());
        closeModal();
    }

    const openEditCommentModal = () => {
        console.log(comment)
        setModalContent((
            <EditCommentModal comment={comment}/>
        ))
    }

    return (
        <div className="editdelete-comment-container">
            <div onClick={openEditCommentModal} className="edit-comment-button">Edit</div>
            <div onClick={deleteComment} className="delete-comment-button">Delete</div>
            <div onClick={closeModal} className="editdelete-comment-cancel">Cancel</div>
        </div>
    )
}

export default EditDeleteCommentModal
