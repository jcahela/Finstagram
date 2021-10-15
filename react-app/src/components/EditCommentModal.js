import EditDeleteCommentModal from "./EditDeleteCommentModal"
import { useModal } from "../context/Modal"
import { getSessionUsersPostsThunk } from "../store/sessionUserPosts";
import { getFollowedUsersPostsThunk } from "../store/followedUsersPosts";
import { useDispatch } from "react-redux";
import './EditCommentModal.css'

function EditCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

    const backToOptions = () => {
        setModalContent((
            <EditDeleteCommentModal comment={comment}/>
        ))
    }

    const editComment = async () => {
        // await dispatch(editCommentThunk(comment));
        // await dispatch(getSessionUsersPostsThunk());
        // await dispatch(getFollowedUsersPostsThunk());
        // closeModal();
    }

    return (
        <div className="edit-comment-container">
            <div className="edit-comment-go-back" onClick={backToOptions}>Go back</div>
            <h1>{comment.description}</h1>
        </div>
    )
}

export default EditCommentModal
