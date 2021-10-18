```jsx
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
                        <div className="comment-options-container">
                            {showCommentOptions === comment && comment.user_id === sessionUser.id && <i onClick={() => openCommentOptionsModal(comment)} ref={commentOptionsRef} className={`fas fa-ellipsis-h comment-options-icon`}></i>}
                        </div>
                        <button className={`profile-new-comment-button disabled-${/^\s*$/.test(comment)}`} disabled={/^\s*$/.test(comment)}>Post</button>
                        </form>
                    </div>

```

```jsx
{/* {showComments === true ? ( */}

                    {/* // ) : ( */}
                        {/* <div
                            onMouseEnter={() => setShowCommentOptions(lastComment)}
                            onMouseLeave={() => setShowCommentOptions(false)}
                            className="comment-row"
                        >
                            <div className="feed-comment"><span onClick={() => sendToUserProfile(lastComment?.user_id)} className="comment-user">{users[lastComment?.user_id]?.username}</span> {lastComment?.description}</div>
                            <div className="comment-options-container">
                                {showCommentOptions === lastComment && lastComment?.user_id === sessionUser.id && <i onClick={() => openCommentOptionsModal(lastComment)} ref={commentOptionsRef} className={`fas fa-ellipsis-h comment-options-icon`}></i>}
                            </div>
                        </div> */}
                        {/* )} */}
```

```jsx
{/* {!showComments && (commentsArr.length > 1) && <div className="view-comments pointer-cursor" onClick={() => setShowComments(true)}>View all {commentsArr?.length} comments</div>}
            {commentsArr.length === 0 && <div className="view-comments default-cursor">No comments</div>} */}
```
