import { useState, useRef } from 'react';
import { useModal } from '../context/Modal';
import './ProfilePostModal.css';

const SharePostModal = ({ post, user, isVideo }) => {
    const emailInputRef = useRef(null);
    const { closeModal } = useModal();
    const [visibility, setVisibility] = useState('invisible');

    const sharePost = (e) => {
        setVisibility('');
    }

    const emailHandler = (e) => {
        const recipient = emailInputRef.current.value;
        const subject = `See this Finstagram ${isVideo ? 'video' : 'photo'} by @${user.username}`;
        const body = `See this Finstagram video by @${user.username}: ${post.content}`;
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }

    return (
        <div className='profile-post-container'>
            <div onClick={sharePost} className='profile-post-div'>
                <span>Send Email</span>
                <input ref={emailInputRef} type='email' id='email-input' className={visibility} />
                <button type='button' id='email-submit-button' onClick={emailHandler} className={visibility}></button>
            </div>
            <div onClick={closeModal} className='profile-post-cancel'>Cancel</div>
        </div>
    )
}

export default SharePostModal;
