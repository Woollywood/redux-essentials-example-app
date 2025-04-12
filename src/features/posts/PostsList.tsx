import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/store'
import { selectAllPosts } from './slice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList: React.FC = () => {
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map(({ id, user, date, title, content }) => (
        <article className="post-excerpt" key={id}>
          <PostAuthor userId={user} />
          <TimeAgo timestamp={date} />
          <Link to={`/posts/${id}`}>
            <h3>{title}</h3>
          </Link>
          <p className="post-content">{content.substring(0, 100)}</p>
          <ReactionButtons id={id} />
        </article>
      ))}
    </section>
  )
}
