import * as api from '~/api'

export const state = () => ({
  isAuthenticated: false,
})

export const mutations = {
  isAuthenticated: (state, payload) => {
    state.isAuthenticated = payload.data.isAuthenticated
  },
}

export const actions = {
  isAuthenticated: (context, payload) => {
    return api.isAuthenticated(payload)
      .then(response => {
        console.log(response)
        context.commit("isAuthenticated", response)
        if (response.data.isAuthenticated) {
          // console.log('User is authenticated.')
        }
        else {
          context.dispatch('users/sessions/clearUserSession', payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  isAuthenticated (state, getters) {
    return state.isAuthenticated
  },
}

export const plugins = []
