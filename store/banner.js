import * as api from '../api'

export const state = () => ({
  bannerImage: {
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

export const getters = {
  bannerImage (state) {
    return state.bannerImage
  },
}

export const mutations = {
  setBannerImage: (state, payload) => {
    // console.log(payload)
    // state.bannerImage = payload
    state.bannerImage = payload.data.bannerImage
  },
}

export const actions = {
  getBannerImage: (context, payload) => {
    return api.fetchBannerImage(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("setBannerImage", response.data)
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}
