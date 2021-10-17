import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users';
import { addCommentThunk, addLikeThunk, removeLikeThunk, followUserThunk, unfollowUserThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { authenticate } from '../store/session';
import { getAllPostsThunk } from '../store/allPosts';
import { useHistory } from 'react-router-dom'
import { useModal } from '../context/Modal';
import './ExplorePostDetails.css';
import './FeedPostCard.css';

function ExplorePostDetails({postKey, posts}) {
    let dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [comment, setComment] = useState('')
    const commentRef = useRef();
    const likeRef = useRef();
    const sessionUser = useSelector(state => state.session.user)

    let users = useSelector(state => state.users)

    let user_id = posts[postKey].user_id

    let commentsObj = useSelector(state => state.allPosts[postKey]?.comments) || {};

    let likesObj = useSelector(state => state.allPosts[postKey]?.likes) || {};

    let followedUsers = useSelector(state => state.session.user?.followed) || {};

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    const textareaHandler = (e) => {
        e.preventDefault();
        setComment(e.target.value)

        const comment = commentRef.current.value;
        if (/^\s*$/.test(comment)) return;
        else if (/\n$/.test(comment)) submitComment(e);
    }

    const submitComment = async (e) => {
        e.preventDefault();
        const newComment = {
            'description': comment,
            'post_id': posts[postKey].id
        }

        commentRef.current.value = '';
        setComment('');
        await dispatch(addCommentThunk(newComment));
        await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const focusComment = () => {
        commentRef.current.focus();
    }

    const addLike = async () => {
        const newLike = {
            'post_id': posts[postKey].id,
        }
        await dispatch(addLikeThunk(newLike));
        await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const removeLike = async () => {
        const likeToDelete = {
            'post_id': posts[postKey].id
        }
        await dispatch(removeLikeThunk(likeToDelete));
        await dispatch(getNonFollowedPostsThunk());
        await dispatch(getAllPostsThunk());
    }

    const buttonClickAnimationShrink = () => {
        const likeIcon = likeRef.current;
        likeIcon.style.transform = 'scale(0.8)'
    }

    const buttonClickAnimationGrow = () => {
        const likeIcon = likeRef.current;
        likeIcon.style.transform = 'scale(1)'
    }

    const followUser = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(authenticate())
    }

    const unfollowUser = async (userId) => {
        await dispatch(unfollowUserThunk(userId))
        await dispatch(authenticate())
    }

    const sendToProfile = () => {
        closeModal();
        history.push(`/users/${user_id}`)
    }

    const sendToUsersProfile = (commentUserId) => {
        closeModal();
        history.push(`/users/${commentUserId}`)
    }

    const isVideo =
        posts[postKey]?.content?.slice(-3) === 'mp4' ||
        posts[postKey]?.content?.slice(-3) === 'mov' ||
        posts[postKey]?.content?.slice(-3) === 'wmv' ||
        posts[postKey]?.content?.slice(-3) === 'avi' ||
        posts[postKey]?.content?.slice(-4) === 'webm' ||
        posts[postKey]?.content?.slice(-5) === 'html5';

    return (
        <div className="details-container">
            <div className="details-image-container">
                { isVideo ? (
                    <video src={posts[postKey].content} className="detail-image" alt="This is something" autoPlay muted controls/>
                ):(
                    <img src={posts[postKey].content} className="detail-image" alt="This is something"/>
                )}
            </div>
            <div className="details">
                <div className="user-info">
                    <img onClick={sendToProfile} src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                    <p onClick={sendToProfile} className="user-name">{users[user_id].username}</p> <span>•</span>
                    { user_id in followedUsers ? (
                        <span onClick={() => unfollowUser(user_id)} className="explore-following">Following</span>
                    ):(
                        <span onClick={() => followUser(user_id)} className="explore-follow">Follow</span>
                    )}
                </div>
                <div className="explore-comment-section">
                    <div className="explore-photo-description">
                        {/* This div contains the photos description along with username */}
                        <img onClick={sendToProfile} src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                        <p>
                            <span onClick={sendToProfile} className="user-name-description">{users[user_id].username}</span>
                            <span className="explore-comment-text">{posts[postKey].description}</span>
                        </p>
                    </div>
                    <div className="explore-comments-div">
                        {
                            Object.values(commentsObj)?.map((comment, index) => {
                                const commentUser = users[comment.user_id];
                                return (
                                    <div key={comment.id} className="explore-commenter-container">
                                        <img onClick={() => sendToUsersProfile(comment.user_id)} src={commentUser.profile_picture} className="explore-profile-pic" alt="this is something"/>
                                        <p>
                                            <span onClick={() => sendToUsersProfile(comment.user_id)} className="user-name-description">{commentUser.username}</span>
                                            <span className="explore-comment-text">{comment.description}</span>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="explore-post-interaction-icons-container">
                    {likesObj && sessionUser.id in likesObj ? (
                        <i ref={likeRef} onMouseDown={buttonClickAnimationShrink} onMouseUp={buttonClickAnimationGrow} onClick={removeLike} className="fas fa-heart feed-like-icon-filled"></i>
                    ): (
                        <i ref={likeRef} onMouseDown={buttonClickAnimationShrink} onMouseUp={buttonClickAnimationGrow} onClick={addLike} className="far fa-heart feed-like-icon"></i>
                    )}
                    <i onClick={focusComment} className="far fa-comment feed-comment-icon"></i>
                </div>
                <div className="explore-likes-counter-container">
                    <p className="explore-likes-counter">{Object.keys(likesObj).length} likes</p>
                </div>
                <div className="explore-comment-input">
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
        </div>
    )
}

export default ExplorePostDetails;
