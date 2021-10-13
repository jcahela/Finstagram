import { useSelector } from 'react-redux';
import { useState } from 'react';
import './FeedPostCard.css'

function FeedPostCard({post}) {
    const [showComments, setShowComments] = useState(false);
    const users = useSelector(state => state.users)
    const user = users[post?.user_id]
    let likesArr;
    if (post) likesArr = Object.values(post.likes)
    let commentsArr;
    let lastComment;
    if (post) commentsArr = Object.values(post.comments)
    if (commentsArr) lastComment = commentsArr[commentsArr.length -1]
    return (
        <div className="post-container">
            <div className="post-header">
                <div className="post-header-user-info">
                    <img className="post-profile-picture" src={user?.profile_picture} alt="" />
                    <p className="post-user">{user?.username}</p>
                </div>
                <i className="fas fa-ellipsis-h options"></i>
            </div>
            <img className="post-image" src={post?.content} alt="" />
            <div className="post-interaction-icons-container">
                <i className="far fa-heart feed-like-icon"></i>
                <i className="far fa-comment feed-comment-icon"></i>
            </div>
            <p className="feed-likes-count">{likesArr?.length} likes</p>
            <div className="post-page-description-container">
                <span className="post-description-user">{user?.username}</span>
                <span className="post-page-description">{post?.description}</span>
            </div>
            {!showComments && (commentsArr.length > 0) && <div className="view-comments" onClick={() => setShowComments(true)}>View all {commentsArr?.length} comments</div>}
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
        </div>
    )
}

export default FeedPostCard;
