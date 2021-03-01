import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  recipes (state, payload) {
    state.recipes.list = payload.data.recipes
  },
}

export const actions = {
  recipes: (context, payload) => {
    return api.recipes(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipes", response.data)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  listSorted (state) {
    // console.log(state)
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
}

export const plugins = [
]
