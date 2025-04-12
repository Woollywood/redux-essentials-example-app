import { useAppDispatch, useAppSelector } from '@/hooks/store'
import React from 'react'
import { selectAllUsers } from '../users'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './slice'

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}
interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault()

    const username = e.currentTarget.elements.username.value
    console.log(username)

    dispatch(userLoggedIn(username))
    navigate('/posts')
  }

  return (
    <section>
      <h2>Welcome to Tweeter!</h2>
      <h3>Please log in:</h3>
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
    </section>
  )
}
