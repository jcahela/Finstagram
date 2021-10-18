import { useState } from "react"
import './PostForm.css'
import { useDispatch } from 'react-redux'
import { addNewPostThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts"
import { useModal } from '../context/Modal'
import { getAllPostsThunk } from "../store/allPosts"

const PostForm = () => {
    const [description, setDescription] = useState('');
    const [contentFile, setContentFile] = useState('');
    const [contentLoading, setContentLoading] = useState(false);
    const [errors, setErrors] = useState([]);
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
        
        const data = await dispatch(addNewPostThunk(formData));
        setContentLoading(false);
        if (data) {
            setErrors(data)
        } else {
            await dispatch(getSessionUsersPostsThunk());
            await dispatch(getAllPostsThunk())
            closeModal();
        }
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
            <input 
                id="post-file"
                className="post-file-input"
                type="file"
                onChange={updateFile}
            />
            </label>
            {contentLoading && (
                <p>Loading...</p>
            )}
            <div className="post-form-errors">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
            ))}
              </div>
            <button className="post-form-button">Submit</button>
        </form>
    )
}


export default PostForm;
