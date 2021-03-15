import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  logOut: (state, payload) => {
    state.list = []
  },
  notifications: (state, payload) => {
    state.list = payload.data
    // for (const [key, value] of Object.entries(payload.data)) {
    //   state.list[key] = value
    // }
  },
}

export const actions = {
  list: (context, payload) => {
    // console.log(payload)
    return api.notifications(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("notifications", response.data)
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export const getters = {
  listSorted (state, getters, rootState, rootGetters) {
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse().slice(0, 100)
  },
}

export const plugins = [
]
