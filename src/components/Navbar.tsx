import React from 'react'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '@/features/users'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { UserIcon } from './UserIcon'
import { userLoggedOut } from '@/features/auth'

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  const isLoggedIn = !!user

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {isLoggedIn ? (
          <div className="navContent">
            <div className="navLinks">
              <Link to="/posts">Posts</Link>
            </div>
            <div className="userDetails">
              <UserIcon size={32} />
              {user.name}
              <button className="button small" onClick={() => dispatch(userLoggedOut())}>
                Log Out
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </nav>
  )
}
