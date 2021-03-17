import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData (state, payload) {
    console.log(payload)
    payload.data.users.forEach(user => {
      const position = state.list.findIndex(item => item.id == user.id)
      if (position == -1) state.list.push(user)
      else state.list[position] = user
    })
    // state.list = payload.data.users
  },
  user (state, payload) {
    // console.log(payload)
    // payload.data.users.forEach(user => {
      const position = state.list.findIndex(item => item.id == payload.data.id)
      console.log(position)
      if (position == -1) state.list.push(payload.data)
      else state.list[position] = payload.data
    // })
  }
}

export const actions = {
  async getUser (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.user(context, payload)
    this.commit("users/user", response.data)
    return response
  },
  async getUsers (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.users(context, payload)
    this.commit("users/setStoreData", response.data)
    return response
  },
}

export const getters = {
  filter (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter( item => {
      return item.slug == keyword
    })[0]
  },
  list (state, getters, rootState, rootGetters) {
    return state.list
  },
}
