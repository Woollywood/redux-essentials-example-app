import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth'
import { AsyncState } from '@/types/store'
import { createAppAsyncThunk } from '@/hooks/store'
import { client } from '@/api/client'

interface User {
  id: string
  name: string
}

interface StoreState extends AsyncState {
  users: User[]
}

const initialState: StoreState = {
  users: [],
  status: 'idle',
  error: null,
}

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
        state.users = payload
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'Unknown error'
      })
  },
  selectors: {
    selectAllUsers: (state) => state.users,
    selectUserById: (state, userId: string | null) => state.users.find(({ id }) => id === userId),
  },
})

export const { selectAllUsers, selectUserById } = slice.selectors
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}
export default slice.reducer
