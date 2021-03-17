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
  query (context, payload) {
    // console.log(payload)
    return api.search(context, payload)
      .then(response => {
        this.commit("search/recipes", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
}

export const getters = {
  result (state) {
    return state.recipes
  },
}
