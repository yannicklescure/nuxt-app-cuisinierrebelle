import * as api from '~/api'

export const state = () => ({
  isAuthenticated: false
})

export const mutations = {
  isAuthenticated (state, payload) {
    state.isAuthenticated = payload.isAuthenticated
  }
}

export const actions = {
  async isAuthenticated (context, payload) {
    // const response = await api.isAuthenticated(context, payload)
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    this.$axios.setHeader('Refresh-Token', this.state.users.sessions.authorization.refreshToken)
    const response = await this.$axios.$get('/v1/users/status')
    this.commit('users/authentication/isAuthenticated', response)
    if (!response.isAuthenticated) {
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
    const response = await api.signUp(context, payload)
    return response
  }
}

export const getters = {
  isAuthenticated (state, getters) {
    return state.isAuthenticated
  }
}
