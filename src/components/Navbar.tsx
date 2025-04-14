import React from 'react'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '@/features/users'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { UserIcon } from './UserIcon'
import { logout } from '@/features/auth'
import { fetchNotifications, selectUnreadNotificationsCount } from '@/features/notifications'

export const Navbar: React.FC = () => {
  const { status } = useAppSelector((state) => state.notifications)
  const user = useAppSelector(selectCurrentUser)

  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)

  const isLoggedIn = !!user

  const dispatch = useAppDispatch()

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {isLoggedIn ? (
          <div className="navContent">
            <div className="navLinks">
              <Link to="/posts">Posts</Link>
              <Link to="/users">Users</Link>
              <Link to="/notifications">
                Notifications {numUnreadNotifications > 0 && <span className="badge">{numUnreadNotifications}</span>}
              </Link>
              <button
                className="button small"
                onClick={() => dispatch(fetchNotifications())}
                disabled={status === 'pending'}
              >
                Refresh notifications
              </button>
            </div>
            <div className="userDetails">
              <UserIcon size={32} />
              {user.name}
              <button className="button small" onClick={() => dispatch(logout())}>
                Log Out
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </nav>
  )
}
