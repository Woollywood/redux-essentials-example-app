import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchPosts, selectPostsIds } from './slice'
import { Spinner } from '@/components/Spinner'
import { PostExcerpt } from './PostExcerpt'

export const PostsList: React.FC = () => {
  const { status, error } = useAppSelector((state) => state.posts)
  const posts = useAppSelector(selectPostsIds)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {status === 'pending' && <Spinner text="Loading..." />}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' && posts.map((id) => <PostExcerpt key={id} id={id} />)}
    </section>
  )
}
