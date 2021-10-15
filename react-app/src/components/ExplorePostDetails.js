import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users';
import { addCommentThunk, addLikeThunk, removeLikeThunk, followUserThunk, unfollowUserThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { authenticate } from '../store/session';
import './ExplorePostDetails.css';
import './FeedPostCard.css';

function ExplorePostDetails({postKey, posts}) {
    let dispatch = useDispatch();
    const [comment, setComment] = useState('')
    const commentRef = useRef();
    const likeRef = useRef();
    const sessionUser = useSelector(state => state.session.user)

    let users = useSelector(state => state.users)

    let user_id = posts[postKey].user_id

    let commentsObj = useSelector(state => state.nonFollowedUsersPosts[postKey].comments);

    let likesObj = useSelector(state => state.nonFollowedUsersPosts[postKey].likes);

    let followedUsers = useSelector(state => state.session.user.followed)

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

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
    }

    const removeLike = async () => {
        const likeToDelete = {
            'post_id': posts[postKey].id
        }
        await dispatch(removeLikeThunk(likeToDelete));
        await dispatch(getNonFollowedPostsThunk());
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

    // comments(pin): {}
    // content(pin):"https://picsum.photos/200/300"
    // description(pin):"Beautiful Lorem Picsum Image"
    // id(pin):3
    // likes(pin): {}
    // user_id(pin):2

    return (
        <div className="details-container">
            <div className="details-image-container">
                <img src={posts[postKey].content} className="detail-image" alt="This is something"/>
            </div>
            <div className="details">
                <div className="user-info">
                    <img src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                    <p className="user-name">{users[user_id].username}</p> <span>•</span> 
                    { user_id in followedUsers ? (
                        <span onClick={() => unfollowUser(user_id)} className="explore-following">Following</span>
                    ):(
                        <span onClick={() => followUser(user_id)} className="explore-follow">Follow</span>
                    )}
                </div>
                <div className="explore-comment-section">
                    <div className="explore-photo-description">
                        {/* This div contains the photos description along with username */}
                        <img src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                        <p>
                            <span className="user-name-description">{users[user_id].username}</span>
                            <span className="explore-comment-text">{posts[postKey].description}</span>
                        </p>
                    </div>
                    <div className="explore-comments-div">
                        {
                            Object.values(commentsObj)?.map((comment, index) => {
                                const commentUser = users[comment.user_id];
                                return (
                                    <div key={comment.id} className="explore-commenter-container">
                                        <img src={commentUser.profile_picture} className="explore-profile-pic" alt="this is something"/>
                                        <p>
                                            <span className="user-name-description">{commentUser.username}</span>
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
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className={`feed-new-comment-button disabled-${comment.replace(/\s/g, '').length === 0}`} disabled={comment.replace(/\s/g, '').length === 0}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExplorePostDetails;
