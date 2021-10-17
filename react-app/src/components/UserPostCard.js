import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { addCommentThunk, addLikeThunk, removeLikeThunk } from '../store/sessionUserPosts';
import { useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import DeletePostModal from './DeletePostModal';
import { useModal } from '../context/Modal';
// TODO: Add getFollowedPostsThunk to submitComment as well
import './ExplorePostDetails.css';
import './UserPostCard.css';

function UserPostCard({ profileVidRef, postKey, posts }) {
    const { toggleModal, setModalContent } = useModal();
    const [comment, setComment] = useState('')
    const commentRef = useRef();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    let post = posts[postKey];

    let user_id = posts[postKey].user_id

    let users = useSelector(state => state.users)

    const commentsObj = useSelector(state => {
        if (sessionUser.id === user_id) {
            return state.sessionUsersPosts[postKey].comments;
        } else if (Object.keys(sessionUser.followed).includes(user_id.toString())) {
            return state.followedUsersPosts[postKey].comments;
        } else {
            return state.nonFollowedUsersPosts[postKey].comments;
        }
    });

    const likesObj = useSelector(state => {
        if (sessionUser.id === user_id) {
            return state.sessionUsersPosts[postKey].likes;
        } else if (Object.keys(sessionUser.followed).includes(user_id.toString())) {
            return state.followedUsersPosts[postKey].likes;
        } else {
            return state.nonFollowedUsersPosts[postKey].likes;
        }
    });

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
        console.log(/^\s*$/.test(comment));
        if (/^\s*$/.test(comment)) return;
        else if (/\n$/.test(comment)) submitComment(e);
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
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getNonFollowedPostsThunk());
    }

    const focusComment = () => {
        commentRef.current.focus();
    }

    const addLike = async () => {
        const newLike = {
            'post_id': post.id,
        }
        await dispatch(addLikeThunk(newLike));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getNonFollowedPostsThunk());
    }

    const removeLike = async () => {
        const likeToDelete = {
            'post_id': post.id
        }
        await dispatch(removeLikeThunk(likeToDelete));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getNonFollowedPostsThunk());
    }

    const openDeletePostModal = () => {
        setModalContent((
            <DeletePostModal postId={post.id} />
        ));
        toggleModal();
    }

    return (
        <div className="details-container">
                                  {/* Header */}
            {post?.user_id === sessionUser.id && <i onClick={openDeletePostModal} className="fas fa-ellipsis-h options"></i>}
            <div className="details-image-container">
                {isVideo ? (
                    <video className="detail-image" src={post?.content} controls autoPlay muted></video>
                ):(
                    <img className="detail-image" src={post?.content} alt="" />
                )}
            </div>
            <div className="details">
                <div className="user-info">
                    <img src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                    <p className="user-name">{users[user_id].firstname} {users[user_id].lastname}</p> <span>•</span> <span className="explore-follow">Follow</span>
                </div>
                <div className="explore-comment-section">
                                 {/* Description */}
                    <div className="explore-photo-description">
                        {/* This div contains the photos description along with username */}
                        <img src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                        <p>
                            <span className="user-name-description">{users[user_id].firstname} {users[user_id].lastname}</span>
                            <span className="explore-comment-text">{posts[postKey].description}</span>
                        </p>
                    </div>
                                   {/* Comments */}
                    <div className="explore-comments-div">
                        {
                            Object.values(commentsObj)?.map((comment, index) => {
                                const commentUser = users[comment.user_id];
                                return (
                                    <div className="explore-commenter-container">
                                        <img src={commentUser.profile_picture} className="explore-profile-pic" alt="this is something"/>
                                        <p>
                                            <span className="user-name-description">{commentUser.firstname} {commentUser.lastname}</span>
                                            <span className="explore-comment-text">{comment.description}</span>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                                {/* Interactions */}
                <div className="explore-post-interaction-icons-container">
                    {likesObj && sessionUser.id in likesObj ? (
                        <i onClick={removeLike} className="fas fa-heart profile-like-icon-filled"></i>
                    ): (
                        <i onClick={addLike} className="far fa-heart profile-like-icon"></i>
                    )}
                    <i onClick={focusComment} className="far fa-comment profile-comment-icon"></i>
                </div>
                <div className="explore-likes-counter-container">
                    <p className="explore-likes-counter">{Object.keys(likesObj).length} likes</p>
                </div>
                                 {/* Add Comment */}
                <div className="explore-comment-input">
                    <form
                        className="profile-new-comment-form"
                        onSubmit={submitComment}
                    >
                    <textarea
                        ref = {commentRef}
                        rows="1"
                        placeholder="Add a comment..."
                        className="profile-new-comment-input"
                        value={comment}
                        onChange={textareaHandler}
                    />
                    <button className={`profile-new-comment-button disabled-${/^\s*$/.test(comment)}`} disabled={/^\s*$/.test(comment)}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserPostCard;
