import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts'
import usersReducer from '@/features/users'
import authReducer from '@/features/auth'
import notificationsReducer from '@/features/notifications'
import { listenerMiddleware } from './listenerMiddleware'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
