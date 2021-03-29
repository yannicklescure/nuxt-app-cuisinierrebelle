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
    console.log(state.list[recipe].comments)
  },
  commentEdit (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
    console.log(state.list[recipe].comments)
  },
  commentNew (state, payload) {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list[recipe].comments.push(payload.data)
    state.list[recipe].comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
    console.log(state.list[recipe].comments)
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
  userPhoto (state, payload) {
    state.list.forEach(item => {
      if (item.user.id === payload.user_id) {
        // console.log(item.recipe.title)
        item.user.image = payload.image
      }
    })
  },
}

export const actions = {
  async replyLike (context, payload) {
    // console.log(payload)
    const response = await api.replyLike(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/replyLike", payload)
    this.commit("users/sessions/replyLike", payload)
    return response
  },
  async replyUnlike (context, payload) {
    // console.log(payload)
    const response = await api.replyUnlike(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/replyUnlike", payload)
    this.commit("users/sessions/replyUnlike", payload)
    return response
  },
  async replyEdit (context, payload) {
    // console.log(payload)
    const response = await api.replyEdit(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/replyEdit", response)
    return response
  },
  async replyDelete (context, payload) {
    // console.log(payload)
    const response = await api.replyDelete(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/replyDelete", payload)
    return response
  },
  async replyNew (context, payload) {
    // console.log(payload)
    const response = await api.replyNew(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/replyNew", response)
    return response
  },
  async commentLike (context, payload) {
    // console.log(payload)
    const response = await api.commentLike(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/commentLike", payload)
    this.commit("users/sessions/commentLike", payload)
    return response
  },
  async commentUnlike (context, payload) {
    // console.log(payload)
    const response = await api.commentUnlike(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/commentUnlike", payload)
    this.commit("users/sessions/commentUnlike", payload)
    return response
  },
  async commentEdit (context, payload) {
    // console.log(payload)
    const response = await api.commentEdit(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/commentEdit", response)
    return response
  },
  async commentNew (context, payload) {
    // console.log(payload)
    const response = await api.commentNew(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/commentNew", response)
    return response
  },
  async commentDelete (context, payload) {
    // console.log(payload)
    const response = await api.commentDelete(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/commentDelete", payload)
    return response
  },
  async bookmark (context, payload) {
    // console.log(payload)
    const response = await api.bookmark(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/bookmark", payload)
    this.commit("users/sessions/bookmark", payload)
    return response
  },
  async unbookmark (context, payload) {
    // console.log(payload)
    const response = await api.unbookmark(context, payload)
    console.log(`response.status ${response.status}`)
    this.commit("recipes/unbookmark", payload)
    this.commit("users/sessions/unbookmark", payload)
    return response
  },
  async like (context, payload) {
    // console.log(payload)
    const response = await api.like(context, payload)
    console.log(`response.status ${response.status}`)
    console.log(response)
    this.commit("recipes/like", payload)
    this.commit("users/sessions/like", payload)
    return response
  },
  async unlike (context, payload) {
    console.log(payload)
    const response = await api.unlike(context, payload)
    console.log(`response.status ${response.status}`)
    console.log(response)
    this.commit("recipes/unlike", payload)
    this.commit("users/sessions/unlike", payload)
    return response
  },
  async list (context, payload) {
    const response = await api.recipes(context, payload)
    this.commit("recipes/list", response.data)
    return response
  },
  async recipe (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.recipe(context, payload)
    this.commit("recipes/recipe", response)
    return response
  },
  async delete (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.recipeDelete(context, payload)
    console.log(response)
    this.commit("recipes/delete", response)
    return response
  },
  async edit (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.recipeEdit(context, payload)
    console.log(response)
    this.commit("recipes/edit", response)
    return response
  },
  async new (context, payload) {
    // console.log(context.state.data.user)
    const response = await api.recipeNew(context, payload)
    this.commit("recipes/new", response)
    return response
  },
  async log (context, payload) {
    console.log(context.state.data.user)
    const response = await api.recipeLog(context, payload)
    this.commit("recipes/log", { data: payload, views: response.data.views })
    return response
  },
}

export const getters = {
  listSorted: (state, getters, rootState, rootGetters) => {
    // console.log(state)
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  list: (state, getters, rootState, rootGetters) => {
    // console.log(state)
    return state.list
  },
  comments: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter( item => {
      return item.recipe.slug == keyword
    })[0].comments
  },
  recipe: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter( item => {
      return item.recipe.slug == keyword
    })[0]
  },
  user: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter( item => {
      return item.user.slug == keyword
    }).slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100: (state, getters, rootState, rootGetters) => {
    return state.list.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
}
