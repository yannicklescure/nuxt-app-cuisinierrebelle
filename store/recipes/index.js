import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  setStoreData: (state, payload) => {
    state.list = payload.data.recipes
  },
  replyLike: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.reply_id)
    state.list[recipe].comments[comment].replies[reply].likes += 1
  },
  replyUnlike: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.reply_id)
    state.list[recipe].comments[comment].replies[reply].likes -= 1
  },
  replyEdit: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
  },
  replyDelete: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    const reply = state.list[recipe].comments[comment].replies.findIndex(item => item.id === payload.id)
    state.list[recipe].comments[comment].replies.splice(reply, 1)
  },
  replyNew: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
  },
  commentLike: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments[comment].likes += 1
  },
  commentUnlike: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments[comment].likes -= 1
  },
  commentDelete: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.recipe_id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.comment_id)
    state.list[recipe].comments.splice(comment, 1)
  },
  commentEdit: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    const comment = state.list[recipe].comments.findIndex(item => item.id === payload.data.id)
    state.list[recipe].comments[comment] = payload.data
  },
  commentNew: (state, payload) => {
    const recipe = state.list.findIndex(item => item.recipe.id === payload.data.recipe.id)
    state.list[recipe].comments.push(payload.data)
  },
  bookmark: (state, payload) => {
    const position = state.list.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    state.list[position].recipe.bookmarks += 1
  },
  unbookmark: (state, payload) => {
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
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list.splice(position, 1)
  },
  edit: (state, payload) => {
    // console.log(payload)
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list[position] = payload.data
  },
  new: (state, payload) => {
    state.list.push(payload.data)
  },
  recipe: (state, payload) => {
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    if (position > -1) state.list[position] = payload.data
    else state.list.push(payload.data)
  },
  log: (state, payload) => {
    const position = state.list.findIndex(item => item.recipe.id == payload.data.recipe.id)
    state.list[position].recipe.views = payload.views
  },
}

export const actions = {
  replyLike: (context, payload) => {
    // console.log(payload)
    return api.replyLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) {
          context.commit("replyLike", payload)
          context.commit("users/sessions/replyLike", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  replyUnlike: (context, payload) => {
    // console.log(payload)
    return api.replyUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) {
          context.commit("replyUnlike", payload)
          context.commit("users/sessions/replyUnlike", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  replyEdit: (context, payload) => {
    // console.log(payload)
    return api.replyEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("replyEdit", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  replyDelete: (context, payload) => {
    // console.log(payload)
    return api.replyDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("replyDelete", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  replyNew: (context, payload) => {
    // console.log(payload)
    return api.replyNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("replyNew", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  commentLike: (context, payload) => {
    // console.log(payload)
    return api.commentLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) {
          context.commit("commentLike", payload)
          context.commit("users/sessions/commentLike", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  commentUnlike: (context, payload) => {
    // console.log(payload)
    return api.commentUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) {
          context.commit("commentUnlike", payload)
          context.commit("users/sessions/commentUnlike", payload, { root: true })
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  commentEdit: (context, payload) => {
    // console.log(payload)
    return api.commentEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("commentEdit", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  commentNew: (context, payload) => {
    // console.log(payload)
    return api.commentNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("commentNew", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  commentDelete: (context, payload) => {
    // console.log(payload)
    return api.commentDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("commentDelete", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
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
        if (response.status == 200) context.commit("recipe", response)
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
  listSorted (state, getters, rootState, rootGetters) {
    // console.log(state)
    return state.list.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  recipe (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter( item => {
      return item.recipe.slug == keyword
    })[0]
  },
  user (state, getters, rootState, rootGetters) {
    return keyword => state.list.slice().filter( item => {
      return item.user.slug == keyword
    }).sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100 (state, getters, rootState, rootGetters) {
    return state.list.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
}

export const plugins = [
]
