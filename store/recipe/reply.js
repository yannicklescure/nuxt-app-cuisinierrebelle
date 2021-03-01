import * as api from '~/api'

export const state = () => ({
})

export const mutations = {
  replyLike: (state, payload) => {
    state.user.replyLikes.push(payload.reply_id)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.recipes.indexOf(recipe)
    const comment = state.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes += 1
  },
  replyUnlike: (state, payload) => {
    const el = state.user.replyLikes.filter(r => r === payload.reply_id)[0]
    const position = state.user.replyLikes.indexOf(el)
    state.user.replyLikes.splice(position, 1)

    const recipe = state.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.recipes.indexOf(recipe)
    const comment = state.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes -= 1
  },
  replyEdit: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.recipes[position].comments.indexOf(comment)
    state.recipes[position].comments[pos] = payload.data
  },
  replyDelete: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    // console.log(recipe)
    const position = state.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.recipes[position].comments.indexOf(comment)
    const reply = state.recipes[position].comments[pos].replies.filter(r => r.id === payload.id)[0]
    const p = state.recipes[position].comments[pos].replies.indexOf(reply)
    state.recipes[position].comments[pos].replies.splice(p, 1)
  },
  replyNew: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.recipes[position].comments.indexOf(comment)
    state.recipes[position].comments[pos] = payload.data
  },
}

export const actions = {
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
  replyLike: (context, payload) => {
    // console.log(payload)
    return api.replyLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("replyLike", payload)
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
        if (response.status === 204) context.commit("replyUnlike", payload)
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
}

export const getters = {
}

export const plugins = [
]
