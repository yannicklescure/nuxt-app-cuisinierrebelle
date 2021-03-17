import * as api from '~/api'

export const state = () => ({
  isAuthenticated: false,
})

export const mutations = {
  isAuthenticated (state, payload) {
    state.isAuthenticated = payload.data.isAuthenticated
  },
}

export const actions = {
  async isAuthenticated (context, payload) {
    const response = await api.isAuthenticated(context, payload)
    console.log(response)
    this.commit("users/authentication/isAuthenticated", response)
    if (!response.data.isAuthenticated) {
      this.commit('users/sessions/logOut', payload)
    }
    return response
  },
  async requestPasswordReset (context, payload) {
    const response = await api.requestPasswordReset(context, payload)
    return response
  },
  async passwordReset (context, payload) {
    const response = await api.passwordReset(context, payload)
    return response
  },
  async passwordResetVerification (context, payload) {
    const response = await api.passwordResetVerification(context, payload)
    return response
  },
  async signUp (context, payload) {
    console.log(context.state)
    const response = await api.signUp(context, payload)
    console.log(response)
    return response
  },
}

export const getters = {
  isAuthenticated (state, getters) {
    return state.isAuthenticated
  },
}
