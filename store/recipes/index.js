import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  list (state, payload) {
    state.list = payload.data.recipes
  },
  delete: (state, payload) => {
    const recipe = state.list.filter(item => item.recipe.id === parseInt(payload.data.recipe.id))[0]
    const position = state.list.indexOf(recipe)
    state.list.splice(position, 1)
  },
  edit: (state, payload) => {
    // console.log(payload)
  },
  new: (state, payload) => {
    state.list.push(payload.data)
  },
  recipe: (state, payload) => {
    const recipe = state.list.filter(r => r.recipe.id === parseInt(payload.data.recipe.id))[0]
    if (recipe) {
      const position = state.list.indexOf(recipe)
      state.recipes[position] = payload.data
    }
  },
  log: (state, payload) => {
    const recipe = state.list.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    const position = state.list.indexOf(recipe)
    state.recipes[position].recipe.views = payload.views
  },
}

export const actions = {
  list: (context, payload) => {
    return api.recipes(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("list", response.data)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  recipe: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipe(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipes/recipe", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  delete: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("delete", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  edit: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeEdit(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("edit", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  new: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeNew(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("new", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  log: (context, payload) => {
    console.log(context.state.data.user)
    return api.recipeLog(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("log", { data: payload, views: response.data.views })
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
  recipe (state) {
    return keyword => state.list.slice().filter( item => {
      return item.recipe.slug === keyword
    })[0];
  },
}

export const plugins = [
]
