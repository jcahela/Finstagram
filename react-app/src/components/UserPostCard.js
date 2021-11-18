import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCommentThunk, addLikeThunk, removeLikeThunk } from '../store/sessionUserPosts';
import { useDispatch } from 'react-redux';
import { followUserThunk, unfollowUserThunk } from '../store/sessionUserPosts';
import { getAllPostsThunk } from '../store/allPosts';
import { authenticate } from '../store/session';
import EditDeleteCommentModal from './EditDeleteCommentModal';
import ProfilePostModal from './ProfilePostModal';
import { useModal } from '../context/Modal';
import './ExplorePostDetails.css';
import './UserPostCard.css';

function UserPostCard({ postKey, posts }) {
    const { toggleModal, setModalContent, closeModal } = useModal();
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [comment, setComment] = useState('')
    const commentRef = useRef();
    const commentOptionsRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);

    let post = posts[postKey];

    let user_id = posts[postKey].user_id

    let users = useSelector(state => state.users)

    const commentsObj = useSelector(state => {
        if (sessionUser.id === user_id) {
            return state.allPosts[postKey]?.comments;
        } else if (Object.keys(sessionUser.followed).includes(user_id.toString())) {
            return state.allPosts[postKey]?.comments;
        } else {
            return state.allPosts[postKey]?.comments;
        }
    }) || {};

    const likesObj = useSelector(state => {
        if (sessionUser.id === user_id) {
            return state.allPosts[postKey]?.likes;
        } else if (Object.keys(sessionUser.followed).includes(user_id.toString())) {
            return state.allPosts[postKey]?.likes;
        } else {
            return state.allPosts[postKey]?.likes;
        }
    }) || {};

    let likesArr = [];
    let commentsArr = [];
    let lastComment;
    if (post?.likes) likesArr = Object.values(post.likes);
    if (post?.comments) commentsArr = Object.values(post.comments);
    if (commentsArr) lastComment = commentsArr[commentsArr.length -1]

    const isVideo = post?.content?.slice(-3) === 'mp4' ||
                    post?.content?.slice(-3) === 'mov' ||
                    post?.content?.slice(-3) === 'wmv' ||
                    post?.content?.slice(-3) === 'avi' ||
                    post?.content?.slice(-4) === 'webm' ||
                    post?.content?.slice(-5) === 'html5';


    const textareaHandler = (e) => {
        e.preventDefault();
        setComment(e.target.value)

        const comment = commentRef.current.value;
        if (/^\s*$/.test(comment)) return;
        else if (/\n$/.test(comment)) submitComment(e);
    }

    const openCommentOptionsModal = (comment) => {
        setModalContent((
            <EditDeleteCommentModal comment={comment}/>
        ));
        toggleModal();
    }

    const submitComment = async (e) => {
        e.preventDefault();
        const newComment = {
            'description': comment,
            'post_id': post.id
        }

        commentRef.current.value = '';
        setComment('');
        await dispatch(addCommentThunk(newComment));
        // await dispatch(getSessionUsersPostsThunk());
        // await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const focusComment = () => {
        commentRef.current.focus();
    }

    const addLike = async () => {
        const newLike = {
            'post_id': post.id,
        }
        await dispatch(addLikeThunk(newLike));
        // await dispatch(getSessionUsersPostsThunk());
        // await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const removeLike = async () => {
        const likeToDelete = {
            'post_id': post.id
        }
        await dispatch(removeLikeThunk(likeToDelete));
        // await dispatch(getSessionUsersPostsThunk());
        // await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const openProfilePostModal = (postID, isVideo) => {
        const post = sessionUsersPosts[postID];
        setModalContent((
            <ProfilePostModal post={post} user={sessionUser} isVideo={isVideo}/>
        ));
        toggleModal();
    }

    const sendToUserProfile = (commentUserId) => {
        closeModal();
        history.push(`/users/${commentUserId}`)
    }

    const followUser = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(authenticate())
    }
    const unfollowUser = async (userId) => {
        await dispatch(unfollowUserThunk(userId))
        await dispatch(authenticate())
    }

    return (
        <div className="details-container">
            <div className="details-image-container">
                {isVideo ? (
                    <video className="detail-image" src={post?.content} controls autoPlay muted></video>
                    ):(
                    <img className="detail-image" src={post?.content} alt="" />
                    )}
            </div>
            <div className="details">
                <div className="profile-user-info">
                    <img src={users[user_id]?.profile_picture} className="explore-profile-pic" alt="user profile"/>
                    <p className="profile-user-name">{users[user_id]?.username}</p>
                    { post.user_id !== sessionUser.id &&
                        <>
                            <span>•</span>
                            {post.user_id in sessionUser.followed ? (
                                <span onClick={() => unfollowUser(user_id)} className="explore-following">Following</span>
                            ):(
                                <span onClick={() => followUser(user_id)} className="explore-follow">Follow</span>
                            )}
                            {/* <span className="explore-follow">Follow</span> */}
                        </>
                    }
                    <span className="profile-header">{post?.user_id === sessionUser.id && <i onClick={() => openProfilePostModal(post.id, isVideo)} className="fas fa-ellipsis-h profile-ellipsis" arial-hidden="true"></i>}</span>
                </div>
                <div className="explore-comment-section">
                    <div className="explore-photo-description">
                        <img src={users[user_id]?.profile_picture} className="explore-profile-pic" alt="commenter profile" />
                        <p>
                            <span className="user-name-description">{users[user_id]?.firstname} {users[user_id]?.lastname}</span>
                            <span className="explore-comment-text">{posts[postKey]?.description}</span>
                        </p>
                    </div>
                    <div className="explore-comments-div">
                        {
                            Object.values(commentsObj)?.map((comment, index) => {
                                const commentUser = users[comment.user_id];
                                const randomKey = (comment.id + index) / comment?.id + comment?.user_id;
                                return (
                                    <div
                                        className="profile-comment-row explore-commenter-container"
                                        key={randomKey}
                                        onMouseEnter={() => setShowCommentOptions(comment)}
                                        onMouseLeave={() => setShowCommentOptions(false)}
                                    >
                                        <img onClick={() => sendToUserProfile(comment?.user_id)} src={commentUser?.profile_picture} className="profile-profile-pic" alt="this is something"/>
                                            <div className="feed-comment"><span onClick={() => sendToUserProfile(comment.user_id)} className="comment-user">{commentUser?.username}</span> <span className="profile-comment-description">{comment.description}</span></div>
                                            <div>{showCommentOptions === comment && comment.user_id === sessionUser.id && <i onClick={() => openCommentOptionsModal(comment)} ref={commentOptionsRef} className={`fas fa-ellipsis-h comment-options-icon`}></i>}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="explore-post-interaction-icons-container">
                    {likesObj && sessionUser.id in likesObj ? (
                        <i onClick={removeLike} className="fas fa-heart profile-like-icon-filled"></i>
                    ): (
                        <i onClick={addLike} className="far fa-heart profile-like-icon"></i>
                    )}
                        <i onClick={focusComment} className="far fa-comment profile-comment-icon"></i>
                    <div className="explore-likes-counter-container"></div>
                    <p className="explore-likes-counter">{Object.keys(likesObj).length} likes</p>
                </div>
                    <form
                        className="feed-new-comment-form"
                        onSubmit={submitComment}
                    >
                        <textarea
                            ref = {commentRef}
                            rows="1"
                            placeholder="Add a comment..."
                            className="feed-new-comment-input"
                            value={comment}
                            onChange={textareaHandler}
                        />
                        <button className={`feed-new-comment-button disabled-${/^\s*$/.test(comment)}`} disabled={/^\s*$/.test(comment)}>Post</button>
                    </form>
            </div>
        </div>
    )
}

export default UserPostCard;
