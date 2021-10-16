```jsx
className={`feed-new-comment-button disabled-${/^\s*$/.test(comment)}`} disabled={/^\s*$/.test(comment)}

if (/^\s*$/.test(comment)) return;
else if (/\n/.test(comment)) submitComment(e);


// Redacted
className={`feed-new-comment-button disabled-${comment.replace(/\s/g, '').length === 0}`} disabled={comment.replace(/\s/g, '').length === 0}
```
