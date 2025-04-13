import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchPosts, Post, selectAllPosts } from './slice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '@/components/Spinner'

const PostExcerpt: React.FC<Post> = ({ id, user, date, title, content }) => {
  return (
    <article className="post-excerpt" key={id}>
      <PostAuthor userId={user} />
      <TimeAgo timestamp={date} />
      <Link to={`/posts/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p className="post-content">{content.substring(0, 100)}</p>
      <ReactionButtons id={id} />
    </article>
  )
}

export const PostsList: React.FC = () => {
  const { posts, status, error } = useAppSelector((state) => state.posts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {status === 'pending' && <Spinner text="Loading..." />}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' && orderedPosts.map((post) => <PostExcerpt key={post.id} {...post} />)}
    </section>
  )
}
