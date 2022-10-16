import PostAuthor from './PostAuthor'
import ReactionButton from './ReactionButton'
import TimeAgo from './TimeAgo'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))

  return (
    <article className="each-post">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>view post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  )
}

export default PostsExcerpt
