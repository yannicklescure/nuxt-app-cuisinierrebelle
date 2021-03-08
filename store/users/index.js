import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData: (state, payload) => {
    state.list = payload.data.users
  },
}
export const actions = {}
export const getters = {
  user (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter( item => {
      return item.slug == keyword
    })[0];
  },
  users (state, getters, rootState, rootGetters) {
    return state.list
  }
}
export const plugins = []
