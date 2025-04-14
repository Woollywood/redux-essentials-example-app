import React from 'react'
import { useAppSelector } from '@/hooks/store'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './slice'
import { selectPostsIdsByUser } from '../posts'
import { PostExcerpt } from '../posts/PostExcerpt'

export const UserPage: React.FC = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, userId!))
  const userPosts = useAppSelector((state) => selectPostsIdsByUser(state, user?.id!))

  return (
    <section>
      {!user ? (
        <h2>User not found</h2>
      ) : (
        <>
          <h2>{user.name}</h2>
          <ul className="posts-list">
            {userPosts.map((id) => (
              <PostExcerpt key={id} id={id} />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
