import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from '../context/Modal';
import { removePostThunk, getSessionUsersPostsThunk } from "../store/sessionUserPosts";

import './ProfilePostModal.css';

const SharePostModal = ({ post, user, isVideo }) => {
    const dispatch = useDispatch();
    const emailInputRef = useRef(null);
    const { closeModal } = useModal();
    const [toggleState, setToggleState] = useState(false);
    const [visibility, setVisibility] = useState('invisible');
    const [expanded, setExpanded] = useState('expanded');
    const [emailSpanText, setEmailSpanText] = useState('Share via Email');

    const emailToggler = (e) => {
        if (!toggleState) {
            setVisibility('');
            setExpanded('');
            setEmailSpanText(`Send ${isVideo ? 'video' : 'photo'} to`);
        } else {
            setVisibility('invisible');
            setExpanded('expanded')
            setEmailSpanText('Share via Email');
        }
        setToggleState(prevState => !prevState);
    }

    const emailHandler = (e) => {
        const recipient = emailInputRef.current.value;
        const subject = `See this Finstagram ${isVideo ? 'video' : 'photo'} by @${user.username}`;
        const body = `See this Finstagram video by @${user.username}: ${post.content}`;
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }

    const deletePost = async () => {
        await dispatch(removePostThunk(post.id));
        await dispatch(getSessionUsersPostsThunk());
        closeModal();
    }

    return (
        <div className='profile-post-container'>
            <div onClick={deletePost} className='profile-post-delete'>Delete</div>
            <div  className='profile-post-options email-share-div'>
                <span className={`email-span ${expanded}`} onClick={emailToggler}>{emailSpanText}</span>
                <input ref={emailInputRef} type='email' className={`email-input ${visibility}`} aria-label='someone@email.com' placeholder='someone@email.com' />
                <button type='button' className={`email-submit-button ${visibility}`} onClick={emailHandler}></button>
            </div>
            {/* <div onClick={sharePost} className='profile-share-div' id='text-share-div'>
                <span>Share via Email</span>
                <input ref={emailInputRef} type='email' id='email-input' aria-label='email recipient here' placeholder='to ...@email.com' className={visibility} />
                <button type='button' id='email-submit-button' onClick={emailHandler} className={visibility}></button>
            </div> */}
            <div onClick={closeModal} className='profile-post-cancel'>Cancel</div>
        </div>
    )
}

export default SharePostModal;
