import * as api from '~/api'
import { isMobile } from 'mobile-device-detect'

// export const strict = false

export const state = () => ({
  lastUpdated: 0,
  render: {
    navbarHeight: 0,
  },
  timestamp: null,
  banner: {
    id: null,
    link: {
      download: null,
    },
    url: null,
    user: {
      name: null,
      username: null
    }
  },
})

export const mutations = {
  setStoreData (state, payload) {
    state.lastUpdated = payload.data.lastUpdated
    state.timestamp = payload.data.timestamp
  },
  navbarHeight (state, payload) {
    state.render.navbarHeight = payload
  },
  banner (state, payload) {
    console.log(payload)
    state.banner = payload.data.bannerImage
  },
}

export const actions = {
  async getBanner ({ commit }, payload) {
    console.log(this)
    const response = await this.$axios.$get('https://api.cuisinierrebelle.com/v1/unsplash_images')
    console.log(response)
    this.commit('banner', response)
    return response
  },
  async getStoreData ({ commit }, payload) {
    console.log(this)
    const response = await this.$axios.$get('https://api.cuisinierrebelle.com/v1/state')
    console.log(response)
    this.commit("setStoreData", response)
    this.commit('recipes/setStoreData', response)
    this.commit('users/setStoreData', response)
    this.dispatch('users/authentication/isAuthenticated', null)
    return response
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
  banner (state) {
    return state.banner
  },
  timestamp (state) {
    return state.timestamp
  },
  isMobile (state) {
    return isMobile
  },
  navbarHeight (state) {
    return state.render.navbarHeight
  },
}
