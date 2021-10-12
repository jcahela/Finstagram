import { useState } from "react"
import './PostForm.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewPostThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts"
import { useModal } from '../context/Modal'

const PostForm = () => {
    const [description, setDescription] = useState('');
    const [contentFile, setContentFile] = useState('');
    const [contentLoading, setContentLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContentFile(file);
    }

    const submitPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", contentFile)
        formData.append("description", description)
        
        setContentLoading(true);
        
        await dispatch(addNewPostThunk(formData));
        setContentLoading(false);
        await dispatch(getSessionUsersPostsThunk());
        closeModal();
        history.push('/feed')
    }

    return (
        <form onSubmit={submitPost} className="post-form-container">
            <span className='post-form-logo'>Post</span>
            <textarea
                className="post-description"
                cols="30" 
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            ></textarea>
            <label 
                className={`post-file-button content-${contentFile !== ''}`} 
                htmlFor="post-file"
            >{contentFile === '' ? "Upload Image/Video": "Added"}
            </label>
            {contentLoading && (
                <p>Loading...</p>
            )}
            <input 
                id="post-file"
                className="post-file-input"
                type="file"
                onChange={updateFile}
            />
            <button className="post-form-button">Submit</button>
        </form>
    )
}


export default PostForm;
