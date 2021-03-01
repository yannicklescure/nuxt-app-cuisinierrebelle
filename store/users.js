import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  users: (state, payload) => {
    state.users = payload.data.users
  },
}

export const actions = {
  users: (context, payload) => {
    // console.log(context.state.data.user)
    return api.users(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("users", response.data)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
}

export const plugins = [
]
