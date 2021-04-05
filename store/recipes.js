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
    const position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks -= 1
  },
  like (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    state.list[position].recipe.likes += 1
  },
  unlike (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    state.list[position].recipe.likes -= 1
  },
  list (state, payload) {
    state.list = payload.data.recipes
  },
  delete (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list.splice(position, 1)
  },
  edit (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list[position] = payload.data
  },
  new (state, payload) {
    state.list.push(payload.data)
  },
  recipe (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.recipe.id)
    if (position > -1) {
      state.list[position] = payload
    } else {
      state.list.push(payload)
    }
  },
  log (state, payload) {
    const position = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list[position].recipe.views = payload.views
  },
  userPhoto (state, payload) {
    state.list.forEach((item) => {
      if (item.user.id === payload.user_id) {
        item.user.image = payload.image
      }
    })
  }
}

export const actions = {
  async replyLike (context, payload) {
    const response = await api.replyLike(context, payload)
    this.commit('recipes/replyLike', payload)
    this.commit('users/sessions/replyLike', payload)
    return response
  },
  async replyUnlike (context, payload) {
    const response = await api.replyUnlike(context, payload)
    this.commit('recipes/replyUnlike', payload)
    this.commit('users/sessions/replyUnlike', payload)
    return response
  },
  async replyEdit (context, payload) {
    const response = await api.replyEdit(context, payload)
    this.commit('recipes/replyEdit', response)
    return response
  },
  async replyDelete (context, payload) {
    const response = await api.replyDelete(context, payload)
    this.commit('recipes/replyDelete', payload)
    return response
  },
  async replyNew (context, payload) {
    const response = await api.replyNew(context, payload)
    this.commit('recipes/replyNew', response)
    return response
  },
  async commentLike (context, payload) {
    const response = await api.commentLike(context, payload)
    this.commit('recipes/commentLike', payload)
    this.commit('users/sessions/commentLike', payload)
    return response
  },
  async commentUnlike (context, payload) {
    const response = await api.commentUnlike(context, payload)
    this.commit('recipes/commentUnlike', payload)
    this.commit('users/sessions/commentUnlike', payload)
    return response
  },
  async commentEdit (context, payload) {
    const response = await api.commentEdit(context, payload)
    this.commit('recipes/commentEdit', response)
    return response
  },
  async commentNew (context, payload) {
    const response = await api.commentNew(context, payload)
    this.commit('recipes/commentNew', response)
    return response
  },
  async commentDelete (context, payload) {
    const response = await api.commentDelete(context, payload)
    this.commit('recipes/commentDelete', payload)
    return response
  },
  async bookmark (context, payload) {
    const response = await api.bookmark(context, payload)
    this.commit('recipes/bookmark', payload)
    this.commit('users/sessions/bookmark', payload)
    return response
  },
  async unbookmark (context, payload) {
    const response = await api.unbookmark(context, payload)
    this.commit('recipes/unbookmark', payload)
    this.commit('users/sessions/unbookmark', payload)
    return response
  },
  async like (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    const response = await this.$axios.$post('/v1/likes', payload, {})
    this.commit('recipes/like', payload)
    this.commit('users/sessions/like', payload)
    return response
  },
  async unlike (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    const response = await this.$axios.$delete(`/v1/likes/${payload.recipe_id}`, payload, {})
    this.commit('recipes/unlike', payload)
    this.commit('users/sessions/unlike', payload)
    return response
  },
  async list (context, payload) {
    const response = await api.recipes(context, payload)
    this.commit('recipes/list', response.data)
    return response
  },
  async recipe (context, payload) {
    // const response = await api.recipe(context, payload)
    const response = await this.$axios.$get(`/v1/recipes/${payload}`)
    this.commit('recipes/recipe', response)
    return response
  },
  async delete (context, payload) {
    const response = await api.recipeDelete(context, payload)
    this.commit('recipes/delete', response)
    return response
  },
  async edit (context, payload) {
    const response = await api.recipeEdit(context, payload)
    this.commit('recipes/edit', response)
    return response
  },
  async new (context, payload) {
    const response = await api.recipeNew(context, payload)
    this.commit('recipes/new', response)
    return response
  },
  async log (context, payload) {
    const response = await api.recipeLog(context, payload)
    this.commit('recipes/log', { data: payload, views: response.data.views })
    return response
  }
}

export const getters = {
  listSorted: (state, getters, rootState, rootGetters) => {
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  list: (state, getters, rootState, rootGetters) => {
    return state.list
  },
  comments: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter((item) => {
      return item.recipe.slug === keyword
    })[0].comments
  },
  recipe: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter((item) => {
      return item.recipe.slug === keyword
    })[0]
  },
  user: (state, getters, rootState, rootGetters) => {
    return keyword => state.list.filter((item) => {
      return item.user.slug === keyword
    }).slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100: (state, getters, rootState, rootGetters) => {
    return state.list.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  }
}
