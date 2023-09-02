import React, { useState } from 'react';

function Comments() {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, commentInput]);
    setCommentInput('');
  };

  return (
    <div>
      <h3>댓글</h3>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <input type="text" value={commentInput} onChange={handleInputChange} />
      <button onClick={handleAddComment}>댓글 추가</button>
    </div>
  );
}

export default Comments;
