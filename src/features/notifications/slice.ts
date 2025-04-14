import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/hooks/store'
import { RootState } from '@/store'
import { AsyncStateEntity } from '@/types/store'
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  date: string
  message: string
  user: string
}

export interface ClientNotification extends Notification {
  read: boolean
  isNew: boolean
}

const adapter = createEntityAdapter<ClientNotification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

type StoreState = AsyncStateEntity<ClientNotification, string>

const initialState: StoreState = adapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchNotifications = createAppAsyncThunk(
  'notifications/fetchNotifications',
  async (_unused, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const { data } = await client.get<Notification[]>(`/fakeApi/notifications?since=${latestTimestamp}`)
    return data
  },
)

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead: (state) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.error = null
        const clientPayload: ClientNotification[] = payload.map((notification) => ({
          ...notification,
          read: false,
          isNew: true,
        }))
        Object.values(state.entities).forEach((notification) => {
          notification.isNew = !notification.read
        })
        adapter.upsertMany(state, clientPayload)
      })
      .addCase(fetchNotifications.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'Unknown message'
      })
  },
})

export const { selectAll: selectAllNotifications } = adapter.getSelectors((state: RootState) => state.notifications)
export const selectUnreadNotificationsCount = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter(({ read }) => !read).length,
)
export const { allNotificationsRead } = slice.actions
export default slice.reducer
