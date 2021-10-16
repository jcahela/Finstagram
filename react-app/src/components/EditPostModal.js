import DeletePostModal from "./DeletePostModal";
import { useModal } from "../context/Modal"
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../store/allPosts";
import { editPostThunk } from "../store/sessionUserPosts";
import './EditPostModal.css'

function EditPostModal({ postId }) {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal, setModalContent } = useModal();
    const post = useSelector(state => state.allPosts[postId])
    const [ description, setDescription ] = useState(post.description);
    const [ editPostErrors, setEditPostErrors ] = useState([])

    useEffect(() => {
        const descriptionTag = descriptionRef.current;
        descriptionTag.focus();
    }, [])

    const backToOptions = () => {
        setModalContent((
            <DeletePostModal postId={postId}/>
        ))
    }

    const editPost = async (e) => {
        e.preventDefault();
        const newPost = {
            'id': postId,
            'description': description
        }
        const data = await dispatch(editPostThunk(newPost));
        if (data) {
            setEditPostErrors(data)
        } else {
            await dispatch(getAllPostsThunk());
            closeModal();
        }
    }

    const cancelEditPost = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="edit-post-container">
            <div className="edit-post-go-back" onClick={backToOptions}>Go back</div>
            <form className="edit-post-form" onSubmit={editPost}>
                <textarea 
                    className="edit-post-form-description"
                    ref={descriptionRef}
                    cols="30" 
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <div className="edit-post-form-errors">
                    {editPostErrors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <button className="edit-post-form-button">Edit Post</button>
                <button onClick={cancelEditPost} className="edit-post-form-cancel">Cancel</button>
            </form>
        </div>
    )
}

export default EditPostModal
