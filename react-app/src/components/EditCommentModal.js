import EditDeleteCommentModal from "./EditDeleteCommentModal"
import { useModal } from "../context/Modal"
import { getSessionUsersPostsThunk, editCommentThunk } from "../store/sessionUserPosts";
import { getFollowedUsersPostsThunk } from "../store/followedUsersPosts";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import './EditCommentModal.css'

function EditCommentModal({ comment }) {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal, setModalContent } = useModal();
    const [ description, setDescription ] = useState(comment.description);

    useEffect(() => {
        const descriptionTag = descriptionRef.current;
        descriptionTag.focus();
    }, [])

    const backToOptions = () => {
        setModalContent((
            <EditDeleteCommentModal comment={comment}/>
        ))
    }

    const editComment = async (e) => {
        e.preventDefault();
        const newComment = {
            'id': comment.id,
            'description': description,
            'post_id': comment.post_id
        }
        await dispatch(editCommentThunk(newComment));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getFollowedUsersPostsThunk());
        closeModal();
    }

    const cancelEditComment = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="edit-comment-container">
            <div className="edit-comment-go-back" onClick={backToOptions}>Go back</div>
            <form className="edit-comment-form" onSubmit={editComment}>
                <textarea 
                    className="edit-comment-form-description"
                    ref={descriptionRef}
                    cols="30" 
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <button className="edit-comment-form-button">Edit Comment</button>
                <button onClick={cancelEditComment} className="edit-comment-form-cancel">Cancel</button>
            </form>
        </div>
    )
}

export default EditCommentModal
