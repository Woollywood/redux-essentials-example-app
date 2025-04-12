import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectAllUsers: (state) => state,
    selectUserById: (state, userId: string | null) => state.find(({ id }) => id === userId),
  },
})

export const { selectAllUsers, selectUserById } = slice.selectors
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}
export default slice.reducer
