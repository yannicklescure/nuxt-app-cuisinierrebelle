import * as api from '../api'
import { isMobile } from 'mobile-device-detect'

export const strict = false

export const state = () => ({
  authorization: {
    authorizationToken: null,
    expireAt: null,
    refreshToken: null,
  },
  isAuthenticated: false,
  lastUpdated: 0,
  notifications: {
    data: []
  },
  recipes: [],
  render: {
    navbarHeight: 0,
  },
  search: {
    recipes: [],
    users: [],
  },
  timestamp: null,
  user: {
    authentication_token: null,
    bookmarks: [],
    email: null,
    facebookAuth: false,
    followers: {
      count: 0,
      data: [],
    },
    following: {
      count: 0,
      data: [],
    },
    locale: 'fr',
  },
  users: [],
})

const fetchUsers = (context, payload) => {
  return api.users(context, payload)
    .then(response => {
      if (response.status === 200) context.commit("users", response)
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}

export const actions = {
  async getStoreData (context, payload) {
    console.log('get store data')
    await api.fetchState()
      .then(response => {
        console.log(response)
        context.commit("setStoreData", response.data)
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  userNotifications: (context, payload) => {
    // console.log(payload)
    return api.userNotifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("userNotifications", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  notifications: (context, payload) => {
    // console.log(payload)
    return api.notifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("notifications", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },


  search: (context, payload) => {
    // console.log(payload)
    return api.search(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("search", response)
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

  followers: (context, payload) => {
    // console.log(payload)
    return api.followers(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        // if (response.status === 200) context.commit("followers", payload)
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

  follow: (context, payload) => {
    // console.log(payload)
    return api.follow(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 200) context.commit("follow", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  unfollow: (context, payload) => {
    // console.log(payload)
    return api.unfollow(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 200) context.commit("unfollow", payload)
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
        if (response.status === 200) context.commit("like", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  unlike: (context, payload) => {
    // console.log(payload)
        return api.unlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 204) context.commit("unlike", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  isAuthenticated: (context, payload) => {
    return api.isAuthenticated(payload)
      .then(response => {
        console.log(response)
        context.commit("isAuthenticated", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  users: (context, payload) => {
    // console.log(context.state.data.user)
    return api.users(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("users", response)
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

  recipes: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipes(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("recipes", response.data)
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

  REGISTRATION_CONFIRMATION: (context, payload) => {
    return api.confirmRegistration(context, payload)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  SIGN_UP: (context, user) => {
    console.log(context.state.data)
    return api.signUp(context, user)
      .then(response => {
        console.log(response)
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        // if (response.status === 200) context.commit("SIGN_UP", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  FACEBOOK_logIn: (context, payload) => {
    const loginUser = payload => {
      console.log(payload)
      // LOGIN USER
      return api.login(context, payload)
        .then(response => {
          if (response.status === 200) context.commit("logIn", response)
          return response
        })
        .catch(error => {
          // console.log(error)
          return error
        })
    }

    return api.facebookLogin(context, payload)
      .then(response => {
        console.log(response)
        if (response.data.isUser) {
          console.log(response)
          const payload = {
            authResponse: response.data.authResponse,
            user: {
              email: response.data.user.email,
              password: null
            }
          }
          console.log(payload)
          return loginUser(payload)
        }
        else {
          // CREATE USER
          // response.data.isFacebookUser = true
          // response.data.authResponse = response.data.authResponse
          // response.data.user.password = { accessToken: response.data.authResponse.accessToken }
          // console.log(response.data.user)
          const payload = {
            authResponse: response.data.authResponse,
            user: {
              first_name: response.data.user.firstName,
              last_name: response.data.user.lastName,
              email: response.data.user.email,
              // password: response.data.user.password,
              // confirmation: response.data.user.confirmation,
            }
          }
          console.log(payload)
          return api.signUp(context, payload)
            .then(response => {
              console.log(response)
              const payload = {
                authResponse: response.data.authResponse,
                user: {
                  email: response.data.user.email,
                  password: null
                }
              }
              return loginUser(payload)
            })
            .catch(error => {
              // console.log(error)
              return error
            })
        }
        // return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PASSWORD_RESET: (context, payload) => {
    return api.passwordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PASSWORD_RESET_VERIFICATION: (context, payload) => {
    return api.passwordResetVerification(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REQUEST_PASSWORD_RESET: (context, payload) => {
    return api.requestPasswordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RESEND_CONFIRMATION_INSTRUCTIONS: (context, payload) => {
    // console.log(context.state.data)
    return api.resendConfirmationInstructions(context, payload)
      .then(response => {
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        // if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  logIn: (context, user) => {
    // console.log(context.state.data)
    return api.login(context, user)
      .then(response => {
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        if (response.status === 200) context.commit("logIn", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  logOut: (context, payload) => {
    console.log(context.state.data)
    return api.logout(context, context.state.data.user.auth)
      .then(response => {
        console.log(response)
        if (response && response.status === 200) {
          context.commit("logOut", payload)
          return response
        }
      })
  },

  refreshAccessToken: (context, payload) =>  {
    return api.refreshAccessToken(context, payload)
      .then(response => {
        console.log(response.data.message)
        context.commit("refreshAccessToken", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
    // refreshAccessToken
    // parseInt(new Date().getTime()/1000)
  },

  userDelete: (context, payload) => {
    console.log(context.state.data)
    return api.userDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 204) context.commit("userDelete", payload)
        return response
      })
  },

  navbarHeight: (context, navbarHeight) => {
    context.commit("navbarHeight", navbarHeight)
    // localStorage.setItem('cuisinier_rebelle', JSON.stringify(context.state.data))
  },
}

const clearUserData = (state) => {
  state.data.user = {
    email: null,
    authentication_token: null,
    facebookAuth: false,
    locale: 'fr',
    bookmarks: [],
    followers: {
      count: 0,
      data: [],
    },
    following: {
      count: 0,
      data: [],
    }
  }
  state.data.authorization = {
    authorizationToken: null,
    refreshToken: null,
    expireAt: null
  }
  state.data.isAuthenticated = false

  return state
}

export const mutations = {

  userNotifications: (state, payload) => {
    // console.log(payload.data.notification)
    state.data.user.notification = payload.data.notification
  },

  notifications: (state, payload) => {
    // console.log(payload)
    // state.data.notifications = payload.data
    for (const [key, value] of Object.entries(payload.data)) {
      // console.log(`${key}: ${value}`)
      state.data.notifications[key] = payload.data[key]
    }
  },

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

  replyLike: (state, payload) => {
    state.data.user.replyLikes.push(payload.reply_id)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes += 1
  },

  replyUnlike: (state, payload) => {
    const el = state.data.user.replyLikes.filter(r => r === payload.reply_id)[0]
    const position = state.data.user.replyLikes.indexOf(el)
    state.data.user.replyLikes.splice(position, 1)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes -= 1
  },

  replyEdit: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
  },

  replyDelete: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.data.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    const reply = state.data.recipes[position].comments[pos].replies.filter(r => r.id === payload.id)[0]
    const p = state.data.recipes[position].comments[pos].replies.indexOf(reply)
    state.data.recipes[position].comments[pos].replies.splice(p, 1)
  },

  replyNew: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
  },

  commentDelete: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.data.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments.splice(pos, 1)
  },

  commentEdit: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
  },

  commentNew: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    state.data.recipes[position].comments.push(payload.data)
  },

  bookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state.data.user.bookmarks.push(payload)
    // console.log(`bookmarks: ${ state.data.user.bookmarks.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.bookmarks += 1
  },

  unbookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const bookmark = state.data.user.bookmarks.filter(bookmark => bookmark.recipe_id === payload.recipe_id)[0]
    let position = state.data.user.bookmarks.indexOf(bookmark)
    state.data.user.bookmarks.splice(position, 1)
    // console.log(`bookmarks: ${ state.data.user.bookmarks.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.bookmarks -= 1
  },

  follow: (state, payload) => {
    // console.log(payload)
    state.data.user.following.count += 1
    state.data.user.following.data.push(payload.data.user)
    const user = state.data.users.filter(user => user.slug === payload.data.user.slug)[0]
    const position = state.data.users.indexOf(user)
    state.data.users[position].followers.count += 1
    state.data.users[position].followers.data.push(payload.data.user)
  },

  unfollow: (state, payload) => {
    // console.log(payload)
    state.data.user.following.count -= 1
    let user = state.data.user.following.data.filter(user => user.slug === payload.user)[0]
    let position = state.data.user.following.data.indexOf(user)
    state.data.user.following.data.splice(position, 1)
    user = state.data.users.filter(user => user.slug === payload.user)[0]
    position = state.data.users.indexOf(user)
    state.data.users[position].followers.count -= 1
    state.data.users[position].followers.data.splice(position, 1)
  },

  like: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state.data.user.likes.push(payload)
    // console.log(`user's likes: ${ state.data.user.likes.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.likes += 1
  },

  unlike: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const like = state.data.user.likes.filter(like => like.recipe_id === payload.recipe_id)[0]
    let position = state.data.user.likes.indexOf(like)
    state.data.user.likes.splice(position, 1)
    // console.log(`user's likes: ${ state.data.user.likes.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.likes -= 1
  },

  setStoreData: (state, payload) => {
    console.log(state)
    state.isAuthenticated = payload.data.isAuthenticated
    state.lastUpdated = payload.data.lastUpdated
    state.recipes = payload.data.recipes
    state.timestamp = payload.data.timestamp
    state.users = payload.data.users
  },

  recipeDelete: (state, payload) => {
    // console.log(payload)
    // console.log(state.data.recipes.length)
    const recipe = state.data.recipes.filter(item => item.recipe.id === parseInt(payload.data.recipe.id))[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    state.data.recipes.splice(position, 1)
    // console.log(state.data.recipes.length)
  },

  recipeEdit: (state, payload) => {
    // console.log(payload)
  },

  recipeNew: (state, payload) => {
    state.data.recipes.push(payload.data)
    // state.data.lastUpdated = new Date().getTime()
  },

  recipe: (state, payload) => {
    // console.log('### recipe ###')
    // console.log(state)
    // console.log(payload)
    const recipe = state.data.recipes.filter(r => r.recipe.id === parseInt(payload.data.recipe.id))[0]
    // console.log(recipe)
    if (recipe) {
      const position = state.data.recipes.indexOf(recipe)
      // console.log(position)
      state.data.recipes[position] = payload.data
      // console.log(state.data)
      // state.data.lastUpdated = new Date().getTime()
    }
  },

  users: (state, payload) => {
    // console.log('### users ###')
    // console.log(payload)
    state.data.users = payload.data.data.users
    // state.data.lastUpdated = new Date().getTime()
  },

  recipes: (state, payload) => {
    // console.log('### recipes ###')
    // console.log(state)
    // console.log(payload)
    state.data.recipes = payload.data.recipes
  },

  search: (state, payload) => {
    // console.log('### search ###')
    // console.log(state)
    // console.log(payload)
    state.data.search.recipes = payload.data.recipes
    // state.data.lastUpdated = new Date().getTime()
  },

  recipeLog: (state, payload) => {
    // console.log(payload)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    // console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    // console.log(position)
    state.data.recipes[position].recipe.views = payload.views
    // state.data.user.points.splice(position, 1)
  },

  logIn: (state, payload) => {
    // console.log(payload)
    // for (const [key, value] of Object.entries(payload.data)) {
      // console.log(`${key}: ${value}`);
    //   state.data[key] = payload.data[key]
    // }
    state.data.user = payload.data

    // console.log(payload.headers['access-token'])
    // console.log(payload.headers['refresh-token'])
    state.data.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
    state.data.isAuthenticated = true
  },

  logOut: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state = clearUserData(state)
  },

  isAuthenticated: (state, payload) => {
    // console.log(payload)
    state.data.isAuthenticated = payload.data.isAuthenticated
    if (payload.data.isAuthenticated) {
      // console.log('User is authenticated.')
    }
    else {
      state = clearUserData(state)
    }
  },

  refreshAccessToken: (state, payload) => {
    state.data.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
    state.data.isAuthenticated = true
  },

  userDelete: (state, payload) => {
    // console.log('userDelete')
  },

  navbarHeight: (state, payload) => {
    state.data.render.navbarHeight = payload
    // context.commit("navbarHeight", navbarHeight)
  },
}

export const getters = {

  timestamp () {
    return state.data.timestamp
  },
  mobile () {
    return isMobile
  },
  authorization (state, getters) {
    return {
      authorizationToken: state.data.authorization.authorizationToken,
      refreshToken: state.data.authorization.refreshToken,
      expireAt: state.data.authorization.expireAt,
    }
  },
  isAuthenticated (state, getters) {
    return state.data.isAuthenticated
    // console.log(state.data.user)
    // return state.data.user.email != null
  },
  facebookAuth (state, getters) {
    // return state.data.isAuthenticated
    // console.log(state.data.user)
    return state.data.user.facebookAuth
  },
  search (state) {
    return state.data.search
  },
  navbarHeight (state) {
    // console.log(state)
    return state.data.render.navbarHeight
  },
  countRecipeComments (state) {
    return item => {
      const counts = item.comments.map(comment => comment.replies.length)
      let sum = counts.length
      counts.map(res => sum += res)
      return sum
    }
  },
  bookmarks (state) {
    return state.data.user.authentication_token ? state.data.user.bookmarks
      .sort((a, b) => (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) ? 1 : -1).reverse()
      .map(bookmark => state.data.recipes.filter(item => item.recipe.id === bookmark.recipe_id)[0]) : []
  },
  userRecipes (state) {
    return keyword => state.data.recipes.filter( item => {
      return item.user.slug === keyword
    })
    .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100 (state) {
    return state.data.recipes.sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
  recipe (state) {
    return keyword => state.data.recipes.filter( item => {
      return item.recipe.slug === keyword
    })[0];
  },
  recipes (state) {
    return state.recipes.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },

  usersFilter (state) {
    return keyword => state.data.users.filter( user => {
      return user.slug === keyword
    })[0];
  },
  notifications (state) {
    return state.data.notifications
  },
  currentUser (state) {
    return state.data.user
  },
}
