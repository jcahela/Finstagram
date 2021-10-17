import { useModal } from "../context/Modal"
import { removePostThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts";
import { useDispatch } from "react-redux";
import EditPostModal from "./EditPostModal";
import './DeletePostModal.css'

function DeletePostModal({ postId }) {
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

    const deletePost = async () => {
        await dispatch(removePostThunk(postId));
        await dispatch(getSessionUsersPostsThunk());
        closeModal();
    }

    const openEditPostModal = async () => {
        setModalContent((
            <EditPostModal postId={postId} />
        ))
    }

    return (
        <div className="delete-post-container">
            <div onClick={openEditPostModal} className="edit-post-button">Edit</div>
            <div onClick={deletePost} className="delete-post-button">Delete</div>
            <div onClick={closeModal} className="delete-post-cancel">Cancel</div>
        </div>
    )
}

export default DeletePostModal
