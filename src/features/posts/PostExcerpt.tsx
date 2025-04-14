import React from 'react'
import { Post, selectPostById } from './slice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'
import { useAppSelector } from '@/hooks/store'

interface Props {
  id: string
  isDetail?: boolean
}

export const PostExcerpt: React.FC<Props> = ({ id, isDetail = false }) => {
  const { user, date, title, content } = useAppSelector((state) => selectPostById(state, id))

  return (
    <article className="post-excerpt" key={id}>
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
