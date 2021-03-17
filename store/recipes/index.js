import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData (state, payload) {
    state.list = payload.data.recipes
  },
  replyLike (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.reply_id)
    state.list[recipe].comments[comment].replies[reply].likes += 1
  },
  replyUnlike (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.reply_id)
    state.list[recipe].comments[comment].replies[reply].likes -= 1
  },
  replyEdit (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
  },
  replyDelete (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.id)
    state.list[recipe].comments[comment].replies.splice(reply, 1)
  },
  replyNew (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
    state.list[recipe].comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  commentLike (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments[comment].likes += 1
  },
  commentUnlike (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments[comment].likes -= 1
  },
  commentDelete (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments.splice(comment, 1)
  },
  commentEdit (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
  },
  commentNew (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list[recipe].comments.push(payload.data)
    state.list[recipe].comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  bookmark (state, payload) {
    const position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks += 1
  },
  unbookmark (state, payload) {
    const  position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks -= 1
  },
  like (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id == payload.recipe_id)
    state.list[position].recipe.likes += 1
  },
  unlike (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id == payload.recipe_id)
    state.list[position].recipe.likes -= 1
  },
  list (state, payload) {
    state.list = payload.data.recipes
  },
  delete (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list.splice(position, 1)
  },
  edit (state, payload) {
    // console.log(payload)
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list[position] = payload.data
  },
  new (state, payload) {
    state.list.push(payload.data)
  },
  recipe (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    if (position > -1) state.list[position] = payload.data
    else state.list.push(payload.data)
  },
  log (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list[position].recipe.views = payload.views
  },
}

export const actions = {
  replyLike (context, payload) {
    // console.log(payload)
    return api.replyLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/replyLike", payload)
        this.commit("users/sessions/replyLike", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  replyUnlike (context, payload) {
    // console.log(payload)
    return api.replyUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/replyUnlike", payload)
        this.commit("users/sessions/replyUnlike", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  replyEdit (context, payload) {
    // console.log(payload)
    return api.replyEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/replyEdit", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  replyDelete (context, payload) {
    // console.log(payload)
    return api.replyDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/replyDelete", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  replyNew (context, payload) {
    // console.log(payload)
    return api.replyNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/replyNew", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  commentLike (context, payload) {
    // console.log(payload)
    return api.commentLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/commentLike", payload)
        this.commit("users/sessions/commentLike", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  commentUnlike (context, payload) {
    // console.log(payload)
    return api.commentUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/commentUnlike", payload)
        this.commit("users/sessions/commentUnlike", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  commentEdit (context, payload) {
    // console.log(payload)
    return api.commentEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/commentEdit", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  commentNew (context, payload) {
    // console.log(payload)
    return api.commentNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/commentNew", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  commentDelete (context, payload) {
    // console.log(payload)
    return api.commentDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/commentDelete", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  bookmark (context, payload) {
    // console.log(payload)
    return api.bookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/bookmark", payload)
        this.commit("users/sessions/bookmark", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  unbookmark (context, payload) {
    // console.log(payload)
        return api.unbookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        this.commit("recipes/unbookmark", payload)
        this.commit("users/sessions/unbookmark", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  like (context, payload) {
    // console.log(payload)
    return api.like(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        this.commit("recipes/like", payload)
        this.commit("users/sessions/like", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  unlike (context, payload) {
    console.log(payload)
    return api.unlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        this.commit("recipes/unlike", payload)
        this.commit("users/sessions/unlike", payload)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  list (context, payload) {
    return api.recipes(context, payload)
      .then(response => {
        this.commit("recipes/list", response.data)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  recipe (context, payload) {
    // console.log(context.state.data.user)
    return api.recipe(context, payload)
      .then(response => {
        this.commit("recipes/recipe", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  delete (context, payload) {
    // console.log(context.state.data.user)
    return api.recipeDelete(context, payload)
      .then(response => {
        console.log(response)
        this.commit("recipes/delete", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  edit (context, payload) {
    // console.log(context.state.data.user)
    return api.recipeEdit(context, payload)
      .then(response => {
        console.log(response)
        this.commit("recipes/edit", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  new (context, payload) {
    // console.log(context.state.data.user)
    return api.recipeNew(context, payload)
      .then(response => {
        this.commit("recipes/new", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  log (context, payload) {
    console.log(context.state.data.user)
    return api.recipeLog(context, payload)
      .then(response => {
        this.commit("recipes/log", { data: payload, views: response.data.views })
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
}

export const getters = {
  listSorted (state, getters, rootState, rootGetters) {
    // console.log(state)
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  list (state, getters, rootState, rootGetters) {
    // console.log(state)
    return state.list
  },
  comments (state, getters, rootState, rootGetters) {
    return keyword => state.list.filter( item => {
      return item.recipe.slug == keyword
    })[0].comments
  },
  recipe (state, getters, rootState, rootGetters) {
    return keyword => state.list.filter( item => {
      return item.recipe.slug == keyword
    })[0]
  },
  user (state, getters, rootState, rootGetters) {
    return keyword => state.list.filter( item => {
      return item.user.slug == keyword
    }).slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100 (state, getters, rootState, rootGetters) {
    return state.list.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
}

export const plugins = [
]
