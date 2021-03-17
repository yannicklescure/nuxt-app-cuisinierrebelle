import * as api from '~/api'

export const state = () => ({
  recipes: [],
  users: [],
})

export const mutations = {
  recipes (state, payload) {
    state.recipes = payload.data.recipes
  },
}

export const actions = {
  async query (context, payload) {
    // console.log(payload)
    const response = await api.search(context, payload)
    this.commit("search/recipes", response)
    return response
  },
}

export const getters = {
  result (state) {
    return state.recipes
  },
}
