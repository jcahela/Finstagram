import { useModal } from "../context/Modal"
import { removeCommentThunk } from "../store/sessionUserPosts";
import { getAllPostsThunk } from "../store/allPosts";
import { useDispatch } from "react-redux";
import EditCommentModal from "./EditCommentModal";
import './EditDeleteCommentModal.css'

function EditDeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

    const deleteComment = async () => {
        await dispatch(removeCommentThunk(comment.id));
        await dispatch(getAllPostsThunk());
        closeModal();
    }

    const openEditCommentModal = () => {
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
