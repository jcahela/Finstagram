import EditDeleteCommentModal from "./EditDeleteCommentModal"
import { useModal } from "../context/Modal"
import { editCommentThunk } from "../store/sessionUserPosts";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllPostsThunk } from "../store/allPosts";
import './EditCommentModal.css'

function EditCommentModal({ comment }) {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal, setModalContent } = useModal();
    const [ description, setDescription ] = useState(comment.description);
    const [ editCommentErrors, setEditCommentErrors ] = useState([])

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

        let errors = [];

        const newComment = {
            'id': comment.id,
            'description': description,
            'post_id': comment.post_id
        }

        if (description.trim() === '') errors.push('You cannot post an empty comment');

        if (errors.length) return setEditCommentErrors(errors);

        const data = await dispatch(editCommentThunk(newComment));
        if (data) {
            setEditCommentErrors(data)
        } else {
            await dispatch(getAllPostsThunk());
            closeModal();
        }
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
                <div className="edit-comment-form-errors">
                    {editCommentErrors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <button className="edit-comment-form-button">Edit Comment</button>
                <button onClick={cancelEditComment} className="edit-comment-form-cancel">Cancel</button>
            </form>
        </div>
    )
}

export default EditCommentModal
