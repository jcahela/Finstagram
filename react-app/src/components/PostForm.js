import { useState } from "react"
import './PostForm.css'

const PostForm = () => {
    const [description, setDescription] = useState('');
    const [contentFile, setContentFile] = useState('');

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContentFile(file);
    }

    return (
        <form className="post-form-container">
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
            >{contentFile === '' ? "Add Picture or Video": "Added"}
            </label>
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
