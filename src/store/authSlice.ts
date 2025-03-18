import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: number
    email: string
    name: string
  } | null
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: Cookies.get('token') || null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { user, token } = action.payload

      state.isAuthenticated = true
      state.user = {...user}
      state.token = token

      Cookies.set("token", token, { expires: 7})
    },
    signout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    }
  }
})

export const { signin, signout } = authSlice.actions
export default authSlice.reducer