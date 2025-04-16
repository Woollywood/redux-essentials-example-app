import React from 'react'
import { Post } from './slice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'

interface Props extends Post {
  isDetail?: boolean
}

export const PostExcerpt: React.FC<Props> = ({ id, user, date, title, content, isDetail = false }) => {
  return (
    <article className="post-excerpt">
      <PostAuthor showPrefix userId={user} />
      <TimeAgo timestamp={date} />
      {!isDetail ? (
        <Link to={`/posts/${id}`}>
          <h3>{title}</h3>
        </Link>
      ) : (
        <h3>{title}</h3>
      )}
      <p className="post-content">{content.substring(0, 100)}</p>
      <ReactionButtons id={id} />
    </article>
  )
}
