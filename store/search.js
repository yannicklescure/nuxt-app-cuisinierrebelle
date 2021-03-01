import * as api from '~/api'

export const state = () => ({
  recipes: [],
  users: [],
})

export const mutations = {
  search: (state, payload) => {
    state.search.recipes = payload.data.recipes
  },
}

export const actions = {
  search: (context, payload) => {
    // console.log(payload)
    return api.search(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("search", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  search (state) {
    return state.search
  },
}

export const plugins = [
]
