import { useAppDispatch, useAppSelector } from '@/hooks/store'
import React, { useLayoutEffect } from 'react'
import { allNotificationsRead, selectAllNotifications } from './slice'
import { Spinner } from '@/components/Spinner'
import { PostAuthor } from '../posts/PostAuthor'
import { TimeAgo } from '../posts/TimeAgo'
import classnames from 'classnames'

export const NotificationsList: React.FC = () => {
  const { status, error } = useAppSelector((state) => state.notifications)
  const notifications = useAppSelector(selectAllNotifications)

  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  }, [notifications])

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {status === 'pending' && <Spinner text="loading..." />}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' &&
        notifications.map((notification) => (
          <div key={notification.id} className={classnames('notification', { new: notification.isNew })}>
            <div>
              <b>
                <PostAuthor userId={notification.user} />
              </b>
            </div>
            <TimeAgo timestamp={notification.date} />
          </div>
        ))}
    </section>
  )
}
