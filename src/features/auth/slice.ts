import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: null,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }: PayloadAction<string>) => {
      state.username = payload
    },
    userLoggedOut: (state) => {
      state.username = null
    },
  },
  selectors: {
    selectCurrentUsername: (state) => state.username,
  },
})

export const { selectCurrentUsername } = slice.selectors
export const { userLoggedIn, userLoggedOut } = slice.actions
export default slice.reducer
