import './ExplorePostDetails.css'

function ExplorePostDetails({postKey, posts}) {


    return (
        <div className="details-container">
            <div className="details-image-container">
                <img src={posts[postKey].content} className="detail-image" alt="This is something"/>
            </div>
            <div className="details">
                <p>stuff</p>
            </div>
        </div>
    )
}

export default ExplorePostDetails;
