import PostAuthor from "./PostAuthor";
import ReactionButton from "./ReactionButton";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";

function PostsExcerpt({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>view potst</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
}

export default PostsExcerpt;
