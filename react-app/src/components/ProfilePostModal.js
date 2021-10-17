import { useState, useRef } from 'react';
import { useModal } from '../context/Modal';
import './ProfilePostModal.css';

const SharePostModal = ({ post }) => {
    const emailInputRef = useRef(null);
    const { closeModal } = useModal();
    const [visibility, setVisibility] = useState('invisible');

    const sharePost = (e) => {
        setVisibility('');
    }

    const emailHandler = (e) => {
        const recipient = emailInputRef.current.value;
        // const emailSubject = See this Instagram video by @i.iii.vii
        // const emailBody = See this Instagram video by @i.iii.vii: https://www.instagram.com/p/CK7KIczFkWf/?utm_source=ig_web_button_share_sheet
        // alert(post.content);
        // window.location.href = `mailto:${recipient}?subject=SubjectHere&body=Message Goes Here`;
        window.location.href = `mailto:${recipient}?subject=SubjectHere&body=${post.content}`;
        // window.location.href = `mailto:${recipient}?subject=SubjectHere&body=${post}>`;
    }

    return (
        <div className='share-post-container'>
            <div onClick={sharePost} className='profile-post-div'>
                <span>Send Email</span>
                <input ref={emailInputRef} type='email' id='email-input' className={visibility} />
                <button type='button' id='email-submit-button' onClick={emailHandler} className={visibility}></button>
            </div>
            <div onClick={closeModal} className='share-post-cancel'>Cancel</div>
        </div>
    )
}

export default SharePostModal;
