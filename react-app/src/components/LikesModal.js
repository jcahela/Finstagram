import { useSelector } from 'react-redux'
import { followUserThunk, unfollowUserThunk } from '../store/sessionUserPosts'
import { authenticate } from '../store/session'
import { useDispatch } from 'react-redux'
import './LikesModal.css'

function LikesModal({ likesList }) {
    const dispatch = useDispatch();
    const likesArr = Object.values(likesList)
    console.log(likesArr)
    const sessionUser = useSelector(state => state.session.user)
    
    const unfollowUser = async (userId) => {
        await dispatch(unfollowUserThunk(userId))
        await dispatch(authenticate())
    }

    const followUser = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(authenticate())
    }

    return (
        <div className="likes-modal-container">
            <h1 className="likes-modal-header">Likes</h1>
            <div className="likes-modal-content-container">
                {likesArr.map((user, index) => (
                    <div key={user.id} className={`likes-modal-user-row-container likes-modal-user-row-${index}`}>
                        <img className="likes-modal-user-profile-picture" src={user.profile_picture} alt="" />
                        <div className="likes-modal-user-info">
                            <p className="likes-modal-user-username">{user.username}</p>
                            <p className="likes-modal-user-firstlast">{user.firstname} {user.lastname}</p>
                        </div>
                        {user.id !== sessionUser.id && (
                            user.id in sessionUser.followed ? (
                                <span onClick={() => unfollowUser(user.id)} className="likes-modal-following-button">Following</span>
                            ):(
                                <span onClick={() => followUser(user.id)} className="likes-modal-follow-button">Follow</span>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LikesModal

// <span onClick={() => unfollowUser(user.id)} className="hover-user-card-following-button">Following</span>
// <span onClick={() => followUser(user.id)} className="hover-user-card-follow-button">Follow</span>
