import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/hooks/store'
import { createSlice } from '@reduxjs/toolkit'

interface StoreState {
  id: string | null
}

export const login = createAppAsyncThunk('auth/login', async (id: string) => {
  await client.post('fakeApi/login', { id })
  return id
})

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.post('fakeApi/logout', {})
})

const initialState: StoreState = {
  id: null,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.id = payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.id = null
      })
  },
  selectors: {
    selectCurrentUserId: (state) => state.id,
  },
})

export const { selectCurrentUserId } = slice.selectors
export default slice.reducer
