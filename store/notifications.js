import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  logOut (state, payload) {
    state.list = []
  },
  set (state, payload) {
    state.list = payload.data
  }
}

export const actions = {
  async list (context, payload) {
    const response = await api.notifications(context, payload)
    this.commit('notifications/set', response.data)
    return response
  }
}

export const getters = {
  listSorted (state, getters, rootState, rootGetters) {
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse().slice(0, 100)
  }
}
