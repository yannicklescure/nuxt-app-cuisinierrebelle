import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData (state, payload) {
    payload.data.users.forEach((user) => {
      const position = state.list.findIndex(item => item.id === user.id)
      if (position === -1) {
        state.list.push(user)
      } else {
        state.list[position] = user
      }
    })
  },
  user (state, payload) {
    const position = state.list.findIndex(item => item.id === payload.data.id)
    if (position === -1) {
      state.list.push(payload.data)
    } else {
      state.list[position] = payload.data
    }
  },
  follow (state, payload) {
    const position = state.list.findIndex(user => user.slug === payload.data.user.slug)
    if (position > -1) {
      state.list[position].followers.count += 1
      state.list[position].followers.data.push(payload.data.user)
    }
  },
  unfollow (state, payload) {
    const position = state.list.findIndex(user => user.slug === payload.user)
    if (position > -1) {
      state.list[position].followers.count -= 1
      state.list[position].followers.data.splice(position, 1)
    }
  }
}

export const actions = {
  async getUser (context, payload) {
    const response = await api.user(context, payload)
    this.commit('users/user', response.data)
    return response
  },
  async getUsers (context, payload) {
    const response = await api.users(context, payload)
    this.commit('users/setStoreData', response.data)
    return response
  }
}

export const getters = {
  filter (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter(item => item.slug === keyword)[0]
  },
  list (state, getters, rootState, rootGetters) {
    return state.list
  }
}
