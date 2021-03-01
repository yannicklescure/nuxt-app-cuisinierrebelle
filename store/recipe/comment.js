import * as api from '~/api'

export const state = () => ({
})

export const mutations = {
  commentLike: (state, payload) => {
    // console.log('commentLike')
    state.data.user.commentLikes.push(payload.comment_id)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    state.data.recipes[recipePosition].comments[commentPosition].likes += 1
  },
  commentUnlike: (state, payload) => {
    const el = state.data.user.commentLikes.filter(r => r === payload.comment_id)[0]
    const position = state.data.user.commentLikes.indexOf(el)
    state.data.user.commentLikes.splice(position, 1)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    state.data.recipes[recipePosition].comments[commentPosition].likes -= 1
  },
  commentDelete: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    // console.log(recipe)
    const position = state.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.recipes[position].comments.indexOf(comment)
    state.recipes[position].comments.splice(pos, 1)
  },
  commentEdit: (state, payload) => {
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
  commentNew: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.recipes.indexOf(recipe)
    // console.log(position)
    state.recipes[position].comments.push(payload.data)
  },
}

export const actions = {
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
  commentLike: (context, payload) => {
    // console.log(payload)
    return api.commentLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("commentLike", payload)
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
        if (response.status === 204) context.commit("commentUnlike", payload)
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
}

export const getters = {
}

export const plugins = [
]
