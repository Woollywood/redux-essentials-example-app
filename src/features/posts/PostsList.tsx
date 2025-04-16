import React, { useMemo } from 'react'

import { Spinner } from '@/components/Spinner'
import { PostExcerpt } from './PostExcerpt'
import { useGetPostsQuery } from '../api/slice'
import classNames from 'classnames'

export const PostsList: React.FC = () => {
  const { data: posts = [], isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPostsQuery()
  const orderedPosts = useMemo(() => posts.slice().sort((a, b) => b.date.localeCompare(a.date)), [posts])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {isLoading && <Spinner text="Loading..." />}
      {isError && <div>{JSON.stringify(error)}</div>}
      {isSuccess && (
        <div className={classNames('posts-container', { disabled: isFetching })}>
          {orderedPosts.map((post) => (
            <PostExcerpt key={post.id} {...post} />
          ))}
        </div>
      )}
    </section>
  )
}
