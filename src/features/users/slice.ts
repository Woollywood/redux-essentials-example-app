import { RootState } from '@/store'
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { AsyncStateEntity } from '@/types/store'
import { createAppAsyncThunk } from '@/hooks/store'
import { client } from '@/api/client'
import { selectCurrentUserId } from '../auth'

export interface User {
  id: string
  firstName: String
  lastName: String
  name: String
  username: String
  posts: string
}

type StoreState = AsyncStateEntity<User, string>

const adapter = createEntityAdapter<User>()

const initialState: StoreState = adapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const { data } = await client.get<User[]>('/fakeApi/users')
  return data
})

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.error = null
        adapter.setAll(state, payload)
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'Unknown error'
      })
  },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = adapter.getSelectors(
  (state: RootState) => state.users,
)
export const selectCurrentUser = (state: RootState) => {
  const currentUserId = selectCurrentUserId(state)
  if (!currentUserId) {
    return
  }
  return selectUserById(state, currentUserId)
}
export default slice.reducer
