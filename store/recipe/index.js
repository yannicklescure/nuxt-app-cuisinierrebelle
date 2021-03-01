import * as api from '~/api'

export const state = () => ({
})

export const mutations = {
  recipeDelete: (state, payload) => {
    const recipe = state.recipes.filter(item => item.recipe.id === parseInt(payload.data.recipe.id))[0]
    const position = state.recipes.indexOf(recipe)
    state.recipes.splice(position, 1)
  },
  recipeEdit: (state, payload) => {
    // console.log(payload)
  },
  recipeNew: (state, payload) => {
    state.recipes.push(payload.data)
  },
  recipe: (state, payload) => {
    const recipe = state.recipes.filter(r => r.recipe.id === parseInt(payload.data.recipe.id))[0]
    if (recipe) {
      const position = state.recipes.indexOf(recipe)
      state.recipes[position] = payload.data
    }
  },
  recipeLog: (state, payload) => {
    const recipe = state.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    const position = state.recipes.indexOf(recipe)
    state.recipes[position].recipe.views = payload.views
  },
}

export const actions = {
  recipe: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipe(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipe", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  recipeDelete: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("recipeDelete", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  recipeEdit: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeEdit(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("recipeEdit", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  recipeNew: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeNew(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipeNew", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  recipeLog: (context, payload) => {
    console.log(context.state.data.user)
    return api.recipeLog(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipeLog", { data: payload, views: response.data.views })
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  recipe (state) {
    return keyword => state.recipes.slice().filter( item => {
      return item.recipe.slug === keyword
    })[0];
  },
}

export const plugins = [
]
