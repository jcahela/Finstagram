import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users';
import { addCommentThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import './ExplorePostDetails.css';

function ExplorePostDetails({postKey, posts}) {
    let dispatch = useDispatch();
    const [comment, setComment] = useState('')
    const commentRef = useRef();

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

    let users = useSelector(state => state.users)

    let user_id = posts[postKey].user_id

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
                    <p className="user-name">{users[user_id].firstname} {users[user_id].lastname}</p> <span>•</span> <span className="explore-follow">Follow</span>
                </div>
                <div className="explore-comment-section">
                    <div className="explore-photo-description">
                        <img src={users[user_id].profile_picture} className="explore-profile-pic" alt="this is something"/>
                        <p>
                            <span className="user-name-description">{users[user_id].firstname} {users[user_id].lastname}</span>
                            <span className="explore-comment-text">{posts[postKey].description}</span>
                        </p>
                    </div>
                </div>
                <div>
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
