import * as api from '~/api'

export const state = () => ({
  authorization: {
    authorizationToken: null,
    expireAt: null,
    refreshToken: null,
  },
  user: {
    authentication_token: null,
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
  }
})

export const mutations = {
  replyLike: (state, payload) => {
    state.user.replyLikes.push(payload.reply_id)
  },
  replyUnlike: (state, payload) => {
    const position = state.user.replyLikes.findIndex(item => item === payload.reply_id)
    state.user.replyLikes.splice(position, 1)
  },
  commentLike: (state, payload) => {
    state.user.commentLikes.push(payload.comment_id)
  },
  commentUnlike: (state, payload) => {
    const el = state.user.commentLikes.findIndex(r => r === payload.comment_id)
    const position = state.user.commentLikes.indexOf(el)
    state.user.commentLikes.splice(position, 1)
  },
  bookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state.user.bookmarks.push(payload)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    // const position = state.recipes.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    // state.recipes[position].recipe.bookmarks += 1
  },
  unbookmark: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const position = state.user.bookmarks.findIndex(bookmark => bookmark.recipe_id === payload.recipe_id)
    state.user.bookmarks.splice(position, 1)
    // console.log(`bookmarks: ${ state.user.bookmarks.length }`)

    // const  position = state.recipes.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    // state.recipes[position].recipe.bookmarks -= 1
  },
  follow: (state, payload) => {
    // console.log(payload)
    state.user.following.count += 1
    state.user.following.data.push(payload.data.user)
    const user = state.users.filter(user => user.slug === payload.data.user.slug)[0]
    const position = state.users.indexOf(user)
    state.users[position].followers.count += 1
    state.users[position].followers.data.push(payload.data.user)
  },
  unfollow: (state, payload) => {
    // console.log(payload)
    state.user.following.count -= 1
    let user = state.user.following.data.filter(user => user.slug === payload.user)[0]
    let position = state.user.following.data.indexOf(user)
    state.user.following.data.splice(position, 1)
    user = state.users.filter(user => user.slug === payload.user)[0]
    position = state.users.indexOf(user)
    state.users[position].followers.count -= 1
    state.users[position].followers.data.splice(position, 1)
  },
  like: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    state.user.likes.push(payload)
    // console.log(`user's likes: ${ state.user.likes.length }`)

    // const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    // const position = state.recipes.indexOf(recipe)
    // state.recipes[position].recipe.likes += 1
  },
  unlike: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const position = state.user.likes.findIndex(like => like.recipe_id === payload.recipe_id)
    state.user.likes.splice(position, 1)
    // console.log(`user's likes: ${ state.user.likes.length }`)

    // const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    // position = state.recipes.indexOf(recipe)
    // state.recipes[position].recipe.likes -= 1
  },
  logOut: (state, payload) => {
    state.authorization = {
      authorizationToken: null,
      expireAt: null,
      refreshToken: null,
    },
    state.user = {
      authentication_token: null,
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
    }
  },
  logIn: (state, payload) => {
    // console.log(state)
    // console.log(payload)
    state.user = payload.data
    if (payload.headers['access-token']) {
      state.authorization = {
        authorizationToken: payload.headers['access-token'],
        refreshToken: payload.headers['refresh-token'],
        expireAt: payload.headers['expire-at']
      }
    }
  },
  refreshAccessToken: (state, payload) => {
    state.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
  },
  notifications: (state, payload) => {
    // console.log(payload.data.notification)
    state.user.notification = payload.data.notification
  },
}

export const actions = {
  delete: (context, payload) => {
    console.log(context.state.data)
    return api.userDelete(context, payload)
      .then(response => {
        console.log(response)
        // if (response.status === 204 || response.status === 200) context.commit("logOut", {})
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
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
      .catch(({ response: error }) => {
        console.log(error)
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
      .catch(({ response: error }) => {
        console.log(error)
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
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  clearUserSession: (context, payload) => {
    context.commit("logOut", payload)
  },
  logIn: (context, payload) => {
    return api.login(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          context.commit("logIn", response)
          context.commit("users/authentication/isAuthenticated", { data: { isAuthenticated: true } }, { root: true })
        }
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  logOut: (context, payload) => {
    return api.logout(context, payload)
      .then(response => {
        console.log(response)
        if (response && response.status === 200) {
          context.commit("logOut", payload)
          context.commit("notifications/logOut", null, { root: true })
          context.commit("users/authentication/isAuthenticated", { data: { isAuthenticated: false } }, { root: true })
          return response
        }
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  refreshAccessToken: (context, payload) =>  {
    return api.refreshAccessToken(context, payload)
      .then(response => {
        // console.log(response.data.message)
        context.commit("refreshAccessToken", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  notifications: (context, payload) => {
    // console.log(payload)
    return api.userNotifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("notifications", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
}

export const getters = {
  bookmarks (state, getters, rootState, rootGetters) {
    // console.log(rootGetters)
    return state.user.bookmarks
      .slice()
      .sort((a, b) => (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) ? 1 : -1).reverse()
      .map(bookmark => rootGetters['recipes/listSorted'].filter(item => item.recipe.id === bookmark.recipe_id)[0])
  },
  current (state, getters, rootState, rootGetters) {
    return state.user
  },
  authorization (state, getters, rootState, rootGetters) {
    return {
      authorizationToken: state.authorization.authorizationToken,
      refreshToken: state.authorization.refreshToken,
      expireAt: state.authorization.expireAt,
    }
  },
  facebookAuth (state, getters, rootState, rootGetters) {
    return state.user.facebookAuth
  },
}

export const plugins = []
