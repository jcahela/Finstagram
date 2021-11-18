import { useSelector } from 'react-redux'
import { followUserThunk, unfollowUserThunk } from '../store/sessionUserPosts'
import { authenticate } from '../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../context/Modal';
import { useHistory } from 'react-router-dom';
import './LikesModal.css'

function ProfileFollowModal({ followList, followers }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const followArr = Object.values(followList)
    const sessionUser = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    const unfollowUser = async (userId) => {
        await dispatch(unfollowUserThunk(userId))
        await dispatch(authenticate())
    }

    const followUser = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(authenticate())
    }

    const sendToProfile = (userId) => {
        history.push(`/users/${userId}`)
        closeModal()
    }

    return (
        <div className="likes-modal-container">
            <h1 className="likes-modal-header">{followers ? "Followers" : "Following"}</h1>
            <div className="likes-modal-content-container">
                {followArr.map((user, index) => (
                    <div key={user.id} className={`likes-modal-user-row-container likes-modal-user-row-${index}`}>
                        <img className="likes-modal-user-profile-picture" src={user.profile_picture} alt="" onClick={() => sendToProfile(user.id)}/>
                        <div className="likes-modal-user-info">
                            <p className="likes-modal-user-username" onClick={() => sendToProfile(user.id)}>{user.username}</p>
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

export default ProfileFollowModal
