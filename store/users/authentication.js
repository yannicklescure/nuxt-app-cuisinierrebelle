import * as api from '~/api'

export const state = () => ({
  isAuthenticated: false,
})

export const mutations = {
  isAuthenticated (state, payload) {
    state.isAuthenticated = payload.data.isAuthenticated
  },
}

export const actions = {
  isAuthenticated (context, payload) {
    return api.isAuthenticated(context, payload)
      .then(response => {
        console.log(response)
        context.commit("isAuthenticated", response)
        if (response.data.isAuthenticated) {
          // console.log('User is authenticated.')
        }
        else {
          context.commit('users/sessions/logOut', payload, { root: true })
        }
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  requestPasswordReset (context, payload) {
    return api.requestPasswordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  passwordReset (context, payload) {
    return api.passwordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  passwordResetVerification (context, payload) {
    return api.passwordResetVerification(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  signUp (context, payload) {
    console.log(context.state)
    return api.signUp(context, payload)
      .then(response => {
        console.log(response)
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        // if (response.status === 200) context.commit("SIGN_UP", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
}

export const getters = {
  isAuthenticated (state, getters) {
    return state.isAuthenticated
  },
}

export const plugins = []
