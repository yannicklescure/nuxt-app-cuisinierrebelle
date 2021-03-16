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
    }
  },
})

export const mutations = {
  setBannerImage: (state, payload) => {
    // console.log(payload)
    // state.bannerImage = payload
    state.image = payload
  },
  set: (state, payload) => {
    // console.log(payload)
    // state.bannerImage = payload
    state.image = payload.bannerImage
  },
}

export const actions = {
  async getBannerImage() {
    console.log(this)
    return await this.$axios.$get('https://api.cuisinierrebelle.com/v1/unsplash_images')
      .then(response => {
        console.log(response)
        this.commit('banner/set', response.data)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
}

export const getters = {
  image (state) {
    return state.image
  },
}
