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
    state.image = payload.data.bannerImage
  },
}

export const actions = {
  getBannerImage: (context, payload) => {
    return api.fetchBannerImage(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("set", response.data)
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export const getters = {
  image (state) {
    return state.image
  },
}
