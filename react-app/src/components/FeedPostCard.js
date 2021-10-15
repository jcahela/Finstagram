import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { addCommentThunk, addLikeThunk, removeLikeThunk } from '../store/sessionUserPosts';
import { useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import DeletePostModal from './DeletePostModal';
import { useModal } from '../context/Modal';
// TODO: Add getFollowedPostsThunk to submitComment as well
import './FeedPostCard.css'

function FeedPostCard({post}) {
    const { toggleModal, setModalContent } = useModal();
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('')
    const commentRef = useRef();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const sessionUser = useSelector(state => state.session.user)
    const user = users[post?.user_id]
    let likesArr = [];
    let commentsArr = [];
    let lastComment;
    if (post?.likes) likesArr = Object.values(post.likes)
    if (post?.comments) commentsArr = Object.values(post.comments)
    if (commentsArr) lastComment = commentsArr[commentsArr.length -1]

    const isVideo = post.content?.slice(-3) === 'mp4' ||
                    post.content?.slice(-3) === 'mov' ||
                    post.content?.slice(-3) === 'wmv' ||
                    post.content?.slice(-3) === 'avi' ||
                    post.content?.slice(-4) === 'webm' ||
                    post.content?.slice(-5) === 'html5'


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
        <div className="post-container">
            <div className="post-header">
                <div className="post-header-user-info">
                    <img className="post-profile-picture" src={user?.profile_picture} alt="" />
                    <p className="post-user">{user?.username}</p>
                </div>
                {post.user_id == sessionUser.id && <i onClick={openDeletePostModal} className="fas fa-ellipsis-h options"></i>}
            </div>
            {isVideo ? (
                <video className="post-image" src={post?.content} controls></video>
            ):(
                <img className="post-image" src={post?.content} alt="" />
            )}
            <div className="post-interaction-icons-container">
                {post.likes && sessionUser.id in post.likes ? (
                    <i onClick={removeLike} className="fas fa-heart feed-like-icon-filled"></i>
                ): (
                    <i onClick={addLike} className="far fa-heart feed-like-icon"></i>
                )}
                <i onClick={focusComment} className="far fa-comment feed-comment-icon"></i>
            </div>
            <p className="feed-likes-count">{likesArr.length} likes</p>
            <div className="post-page-description-container">
                <span className="post-description-user">{user?.username}</span>
                <span className="post-page-description">{post?.description}</span>
            </div>
            {!showComments && (commentsArr.length > 1) && <div className="view-comments" onClick={() => setShowComments(true)}>View all {commentsArr?.length} comments</div>}
            {commentsArr.length === 0 && <div className="view-comments">No comments</div>}
            <div className="comments-container">
                {showComments === true ? (
                    commentsArr?.map((comment, index) => {
                        const commentUser = users[comment.user_id];
                        return (
                            <div className="feed-comment" key={index}><span className="comment-user">{commentUser?.username}</span> {comment.description}</div>
                        )
                    })
                ): (
                    <div className="feed-comment"><span className="comment-user">{users[lastComment?.user_id]?.username}</span> {lastComment?.description}</div>
                )}
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
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className={`feed-new-comment-button disabled-${comment.replace(/\s/g, '').length === 0}`} disabled={comment.replace(/\s/g, '').length === 0}>Post</button>
            </form>
        </div>
    )
}

export default FeedPostCard;
