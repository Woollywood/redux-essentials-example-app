import { useAppDispatch, useAppSelector } from '@/hooks/store'
import React, { useEffect } from 'react'
import { fetchUsers, selectAllUsers } from '../users'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './slice'
import { Spinner } from '@/components/Spinner'

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}
interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users, status, error } = useAppSelector((state) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault()

    const username = e.currentTarget.elements.username.value

    dispatch(userLoggedIn(username))
    navigate('/posts')
  }

  return (
    <section>
      <h2>Welcome to Tweeter!</h2>
      <h3>Please log in:</h3>
      {status === 'pending' && <Spinner text="Loading..." />}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User:</label>
          <select id="username" name="username" required>
            <option value=""></option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button>Log In</button>
        </form>
      )}
    </section>
  )
}
