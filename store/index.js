import * as api from '~/api'
// export const strict = false

export const state = () => ({
  lastUpdated: 0,
  render: {
    navbarHeight: 0
  },
  timestamp: null
})

export const mutations = {
  setStoreData (state, payload) {
    state.lastUpdated = payload.data.lastUpdated
    // state.timestamp = payload.data.timestamp
    state.timestamp = new Date().getTime()
  },
  navbarHeight (state, payload) {
    state.render.navbarHeight = payload
  },
  banner (state, payload) {
    state.banner = payload.data.bannerImage
  }
}

export const actions = {
  async getStoreData ({ commit }, payload) {
    const response = await this.$axios.$get(`${process.env.apiUrl}/v1/state`)
    this.commit('setStoreData', response)
    this.commit('recipes/setStoreData', response)
    this.commit('users/setStoreData', response)
    this.dispatch('users/authentication/isAuthenticated', null)
    return response
  },
  async registrationConfirmation (context, payload) {
    const response = await api.confirmRegistration(context, payload)
    return response
  },
  async resendConfirmationInstructions (context, payload) {
    const response = await api.resendConfirmationInstructions(context, payload)
    return response
  },
  navbarHeight (context, payload) {
    this.commit('navbarHeight', payload)
  }
}

export const getters = {
  timestamp (state) {
    return state.timestamp
  },
  navbarHeight (state) {
    return state.render.navbarHeight
  }
}
