import * as api from '~/api'

export const state = () => ({
  recipes: [],
  users: [],
})

export const mutations = {
  recipes: (state, payload) => {
    state.recipes = payload.data.recipes
  },
}

export const actions = {
  query: (context, payload) => {
    // console.log(payload)
    return api.search(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("recipes", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  result (state) {
    return state.recipes
  },
}

export const plugins = [
]
