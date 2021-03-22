import * as api from '~/api'

export const state = () => ({
  image: {
    id: null,
    link: {
      download: null,
    },
    url: null,
    user: {
      name: null,
      username: null
    },
    timestamp: 0
  },
})

export const mutations = {
  set (state, payload) {
    // console.log(payload)
    state.image = payload.data.bannerImage
    state.image.timestamp = new Date().getTime()
  },
}

export const actions = {
  async get ({ commit }, payload) {
    // console.log(this)
    const response = await this.$axios.$get('https://api.cuisinierrebelle.com/v1/unsplash_images')
    console.log(response)
    this.commit('banner/set', response)
    return response
  },
}

export const getters = {
  image (state) {
    return state.image
  },
}
