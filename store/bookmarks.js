import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  bookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state.user.bookmarks.push(payload)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.recipes.indexOf(recipe)
    state.recipes[position].recipe.bookmarks += 1
  },
  unbookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const bookmark = state.user.bookmarks.filter(bookmark => bookmark.recipe_id === payload.recipe_id)[0]
    let position = state.user.bookmarks.indexOf(bookmark)
    state.user.bookmarks.splice(position, 1)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.recipes.indexOf(recipe)
    state.recipes[position].recipe.bookmarks -= 1
  },
}

export const actions = {
  bookmark: (context, payload) => {
    // console.log(payload)
    return api.bookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("bookmark", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  unbookmark: (context, payload) => {
    // console.log(payload)
        return api.unbookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("unbookmark", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  bookmarks (state) {
    return state.user.authentication_token ? state.user.bookmarks
      .sort((a, b) => (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) ? 1 : -1).reverse()
      .map(bookmark => state.recipes.filter(item => item.recipe.id === bookmark.recipe_id)[0]) : []
  },
}

export const plugins = [
]
