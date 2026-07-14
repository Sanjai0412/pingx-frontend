const CommentBody = ({ comment, compact }) => {
  return (
    <div>
      <p className="comment-body">{comment.content}</p>
    </div>
  );
};

export default CommentBody;
