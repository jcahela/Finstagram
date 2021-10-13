import FeedPostCard from './FeedPostCard'
import './FeedPage.css'


function FeedPage() {
    return (
        <div className="feed-page-container">
            <div className="feed-container">
                <FeedPostCard />
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
