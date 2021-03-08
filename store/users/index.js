import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData: (state, payload) => {
    console.log(payload)
    state.list = payload.data.users
  },
}
export const actions = {
  getUsers: (context, payload) => {
      // console.log(context.state.data.user)
      return api.users(context, payload)
        .then(response => {
          if (response.status === 200) context.commit("setStoreData", response.data)
          return response
        })
        .catch(error => {
          // console.log(error)
          return error
        })
    },
}

export const getters = {
  filter (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter( item => {
      return item.slug == keyword
    })[0]
  },
  users (state, getters, rootState, rootGetters) {
    return state.list
  }
}
export const plugins = []
