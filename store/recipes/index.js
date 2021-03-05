import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  bookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    // state.user.bookmarks.push(payload)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    const position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks += 1
  },
  unbookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    // const position = state.user.bookmarks.findIndex(bookmark => bookmark.recipe_id === payload.recipe_id)
    // state.user.bookmarks.splice(position, 1)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    const  position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks -= 1
  },
  like: (state, payload) => {
    const position = state.list.findIndex(item => item.recipe.id == payload.recipe_id)
    state.list[position].recipe.likes += 1
  },
  unlike: (state, payload) => {
    const position = state.list.findIndex(item => item.recipe.id == payload.recipe_id)
    state.list[position].recipe.likes -= 1
  },
  list (state, payload) {
    state.list = payload.data.recipes
  },
  delete: (state, payload) => {
    const position = state.list.findIndex(item => item.recipe.id == parseInt(payload.data.recipe.id))
    state.list.splice(position, 1)
  },
  edit: (state, payload) => {
    // console.log(payload)
  },
  new: (state, payload) => {
    state.list.push(payload.data)
  },
  recipe: (state, payload) => {
    const position = state.list.findIndex(r => r.recipe.id == parseInt(payload.data.recipe.id))
    state.recipes[position] = payload.data
  },
  log: (state, payload) => {
    const position = state.list.findIndex(r => r.recipe.id == payload.data.recipe.id)
    state.recipes[position].recipe.views = payload.views
  },
}

export const actions = {
  bookmark: (context, payload) => {
    // console.log(payload)
    return api.bookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) {
          context.commit("bookmark", payload)
          context.commit("users/sessions/bookmark", payload, { root: true })

        }
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
        if (response.status === 204) {
          context.commit("unbookmark", payload)
          context.commit("users/sessions/unbookmark", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  like: (context, payload) => {
    // console.log(payload)
    return api.like(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status == 200) {
          context.commit("like", payload)
          context.commit("users/sessions/like", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  unlike: (context, payload) => {
    console.log(payload)
    return api.unlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status == 204) {
          context.commit("unlike", payload)
          context.commit("users/sessions/unlike", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  list: (context, payload) => {
    return api.recipes(context, payload)
      .then(response => {
        if (response.status == 200) context.commit("list", response.data)
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
        if (response.status == 200) context.commit("recipes/recipe", response)
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
        if (response.status == 200) context.commit("delete", response)
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
        if (response.status == 200) context.commit("edit", response)
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
        if (response.status == 200) context.commit("new", response)
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
        if (response.status == 200) context.commit("log", { data: payload, views: response.data.views })
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
      return item.recipe.slug == keyword
    })[0];
  },
  top100 (state) {
    return state.list.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
}

export const plugins = [
]
