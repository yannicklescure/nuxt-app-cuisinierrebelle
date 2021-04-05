export const state = () => ({
  recipes: [],
  users: []
})

export const mutations = {
  recipes (state, payload) {
    state.recipes = payload.recipes
  }
}

export const actions = {
  async query (context, payload) {
    const response = await this.$axios.$get('/v1/search', { params: payload }, {})
    this.commit('search/recipes', response)
    return response
  }
}

export const getters = {
  result (state) {
    return state.recipes
  }
}
