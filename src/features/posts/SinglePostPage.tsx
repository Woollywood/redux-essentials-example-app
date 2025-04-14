import React from 'react'
import { useAppSelector } from '@/hooks/store'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './slice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUser } from '../users'

export const SinglePostPage: React.FC = () => {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId!))

  const user = useAppSelector(selectCurrentUser)
  const canEdit = user?.name === post?.user

  return (
    <section>
      {!post ? (
        <h2>Post not found</h2>
      ) : (
        <article className="post">
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <ReactionButtons id={post.id} />
          {canEdit && (
            <Link to={`/editPost/${post.id}`} className="button">
              Edit Post
            </Link>
          )}
        </article>
      )}
    </section>
  )
}
