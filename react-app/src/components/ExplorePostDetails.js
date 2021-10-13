import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users';
import './ExplorePostDetails.css';

function ExplorePostDetails({postKey, posts}) {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])

    let users = useSelector(state => state.users)

    return (
        <div className="details-container">
            <div className="details-image-container">
                <img src={posts[postKey].content} className="detail-image" alt="This is something"/>
            </div>
            <div className="details">
                <div className="user-info">
                    <img src={users[posts[postKey].user_id].profile_picture} className="profile-pic" alt="this is something"/>
                    <p className="user-name">{users[posts[postKey].user_id].firstname} {users[posts[postKey].user_id].lastname}</p> <span>•</span> <span className="explore-follow">Follow</span>
                </div>
                <p>stuff</p>
            </div>
        </div>
    )
}

export default ExplorePostDetails;
