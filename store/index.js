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
  setStoreData (state, payload) {
    state.lastUpdated = payload.data.lastUpdated
    state.timestamp = payload.data.timestamp
  },
  navbarHeight (state, payload) {
    state.render.navbarHeight = payload
  },
}

export const actions = {
  async get ({ commit }, payload) {
    console.log(this)
    return await this.$axios.$get('https://api.cuisinierrebelle.com/v1/state')
      .then(response => {
        console.log(response)
        this.commit("setStoreData", response)
        this.commit('recipes/setStoreData', response)
        this.commit('users/setStoreData', response)
        this.dispatch('users/authentication/isAuthenticated', null)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  // getStoreData (context, payload) {
  //   // console.log('get store data')
  //   return api.getStoreData(context, payload)
  //     .then(response => {
  //       // console.log(response)
  //       this.commit("setStoreData", response.data)
  //       this.commit('recipes/setStoreData', response.data)
  //       this.commit('users/setStoreData', response.data)
  //       this.dispatch('users/authentication/isAuthenticated', null)
  //       return response
  //     })
  //     .catch(({ response: error }) => {
  //       console.log(error)
  //     })
  // },
  registrationConfirmation (context, payload) {
    return api.confirmRegistration(context, payload)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  resendConfirmationInstructions (context, payload) {
    return api.resendConfirmationInstructions(context, payload)
      .then(response => {
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  navbarHeight (context, payload) {
    this.commit("navbarHeight", payload)
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
