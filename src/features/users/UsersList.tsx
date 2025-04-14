import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchUsers, selectAllUsers } from './slice'
import { Spinner } from '@/components/Spinner'
import { Link } from 'react-router-dom'

export const UsersList: React.FC = () => {
  const { status, error } = useAppSelector((state) => state.users)
  const users = useAppSelector(selectAllUsers)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {status === 'pending' && <Spinner text="Loading users..." />}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' && (
        <ul className="users-list">
          {users.map(({ id, name }) => (
            <Link to={`/users/${id}`} key={id}>
              {name}
            </Link>
          ))}
        </ul>
      )}
    </section>
  )
}
