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
export const getters = {}
export const plugins = []
