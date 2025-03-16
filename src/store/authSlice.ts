import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {
      id: 0,
      email: '',
      name: '',
      role: '',
    },
    token: ""
  },
  reducers: {
    signin: (state, action) => {
      const { user, token } = action.payload

      state.isAuthenticated = true
      state.user = {...user}
      state.token = token
    },
    signout: (state) => {
      state.isAuthenticated = false
      state.user = {
        id: 0,
        email: '',
        name: '',
        role: '',
      },
      state.token = ""
    }
  }
})

export const { signin, signout } = authSlice.actions
export default authSlice.reducer