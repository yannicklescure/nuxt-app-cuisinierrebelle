import * as api from '~/api'
import { isMobile } from 'mobile-device-detect'

// export const strict = false

export const state = () => ({
  lastUpdated: 0,
  render: {
    navbarHeight: 0,
  },
  timestamp: null,
})

export const mutations = {
  setStoreData: (state, payload) => {
    state.lastUpdated = payload.data.lastUpdated
    state.timestamp = payload.data.timestamp
  },
  navbarHeight: (state, payload) => {
    state.render.navbarHeight = payload
    // context.commit("navbarHeight", navbarHeight)
  },
}

export const actions = {
  getStoreData: (context, payload) => {
    // console.log('get store data')
    return api.getStoreData(context, payload)
      .then(response => {
        // console.log(response)
        context.commit("setStoreData", response.data)
        context.commit('recipes/setStoreData', response.data, { root: true })
        context.commit('users/setStoreData', response.data, { root: true })
        context.dispatch('users/authentication/isAuthenticated', null, { root: true })
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
  registrationConfirmation: (context, payload) => {
    return api.confirmRegistration(context, payload)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
  resendConfirmationInstructions: (context, payload) => {
    return api.resendConfirmationInstructions(context, payload)
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
  navbarHeight: (context, payload) => {
    context.commit("navbarHeight", payload)
  },
}

export const getters = {
  timestamp () {
    return state.timestamp
  },
  isMobile () {
    return isMobile
  },
  navbarHeight (state) {
    return state.render.navbarHeight
  },
}
