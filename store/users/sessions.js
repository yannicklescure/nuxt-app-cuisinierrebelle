import * as api from '~/api'

export const state = () => ({
  authorization: {
    authorizationToken: null,
    expireAt: null,
    refreshToken: null
  },
  user: {
    authentication_token: null,
    bookmarks: [],
    email: null,
    facebookAuth: false,
    followers: {
      count: 0,
      data: []
    },
    following: {
      count: 0,
      data: []
    },
    image: {
      openGraph: {
        url: null
      }
    },
    locale: 'fr'
  }
})

export const mutations = {
  replyLike (state, payload) {
    state.user.replyLikes.push(payload.reply_id)
  },
  replyUnlike (state, payload) {
    const position = state.user.replyLikes.findIndex(item => item === payload.reply_id)
    state.user.replyLikes.splice(position, 1)
  },
  commentLike (state, payload) {
    state.user.commentLikes.push(payload.comment_id)
  },
  commentUnlike (state, payload) {
    const el = state.user.commentLikes.findIndex(r => r === payload.comment_id)
    const position = state.user.commentLikes.indexOf(el)
    state.user.commentLikes.splice(position, 1)
  },
  bookmark (state, payload) {
    state.user.bookmarks.push(payload)

    // const position = state.recipes.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    // state.recipes[position].recipe.bookmarks += 1
  },
  unbookmark (state, payload) {
    const position = state.user.bookmarks.findIndex(bookmark => bookmark.recipe_id === payload.recipe_id)
    state.user.bookmarks.splice(position, 1)
    // const  position = state.recipes.findIndex(recipe => recipe.recipe.id === payload.recipe_id)
    // state.recipes[position].recipe.bookmarks -= 1
  },
  follow (state, payload) {
    state.user.following.count += 1
    state.user.following.data.push(payload.data.user)
  },
  unfollow (state, payload) {
    state.user.following.count -= 1
    const position = state.user.following.data.findIndex(user => user.slug === payload.user)
    state.user.following.data.splice(position, 1)
  },
  like (state, payload) {
    state.user.likes.push(payload)
    // const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    // const position = state.recipes.indexOf(recipe)
    // state.recipes[position].recipe.likes += 1
  },
  unlike (state, payload) {
    const position = state.user.likes.findIndex(like => like.recipe_id === payload.recipe_id)
    state.user.likes.splice(position, 1)
    // const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    // position = state.recipes.indexOf(recipe)
    // state.recipes[position].recipe.likes -= 1
  },
  logOut (state, payload) {
    state.authorization = {
      authorizationToken: null,
      expireAt: null,
      refreshToken: null
    }

    state.user = {
      authentication_token: null,
      bookmarks: [],
      email: null,
      facebookAuth: false,
      followers: {
        count: 0,
        data: []
      },
      following: {
        count: 0,
        data: []
      },
      image: {
        openGraph: {
          url: null
        }
      },
      locale: 'fr'
    }
  },
  logIn (state, payload) {
    state.user = payload
  },
  currentState (state, payload) {
    state.user = payload
  },
  refreshAccessToken (state, payload) {
    state.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
  },
  notifications (state, payload) {
    state.user.notification = payload.data.notification
  },
  photo (state, payload) {
    state.user.image = payload.image
  }
}

export const actions = {
  async delete (context, payload) {
    const response = await api.userDelete(context, payload)
    // this.commit('logOut', {})
    return response
  },
  async followers (context, payload) {
    const response = await api.followers(context, payload)
    // this.commit('users/sessions/followers', payload)
    return response
  },
  async follow (context, payload) {
    const response = await api.follow(context, payload)
    this.commit('users/follow', response)
    this.commit('users/sessions/follow', response)
    return response
  },
  async unfollow (context, payload) {
    const response = await api.unfollow(context, payload)
    this.commit('users/unfollow', payload)
    this.commit('users/sessions/unfollow', payload)
    return response
  },
  clearUserSession (context, payload) {
    this.commit('users/sessions/logOut', payload)
  },
  async currentState (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    const response = await this.$axios.$get('/v1/users/current')
    this.commit('users/sessions/currentState', response)
  },
  async logIn (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    const response = await this.$axios.$post('/users/sign_in', payload, {})
    if (response.email === payload.email) {
      this.commit('users/sessions/logIn', response)
      this.commit('users/authentication/isAuthenticated', { isAuthenticated: true })
    }
    return response
  },
  async logOut (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    const response = await this.$axios.$delete('/users/sign_out')
    this.commit('users/sessions/logOut', payload)
    this.commit('notifications/logOut', null)
    this.commit('users/authentication/isAuthenticated', { isAuthenticated: false })
    return response
  },
  async refreshAccessToken (context, payload) {
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    this.$axios.setHeader('Refresh-Token', this.state.users.sessions.authorization.refreshToken)
    const response = await this.$axios.$post('/users/tokens')
    // this.commit('users/sessions/refreshAccessToken', response)
    return response
  },
  async notifications (context, payload) {
    const response = await api.userNotifications(context, payload)
    this.commit('users/sessions/notifications', response)
    return response
  },
  async photo ({ commit }, payload) {
    const FormData = require('form-data')
    const formData = new FormData()
    formData.append('image', payload.image)
    this.$axios.setHeader('Authorization', `Bearer ${this.state.users.sessions.authorization.authorizationToken}`)
    this.$axios.setHeader('Content-Type', 'multipart/form-data')
    const response = await this.$axios.$patch('/v1/users/photo', formData, {})
    this.commit('users/sessions/photo', response)
    this.commit('recipes/userPhoto', response)
    this.$axios.setHeader('Content-Type', false)
    return response
  }
}

export const getters = {
  bookmarks (state, getters, rootState, rootGetters) {
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
      expireAt: state.authorization.expireAt
    }
  },
  facebookAuth (state, getters, rootState, rootGetters) {
    return state.user.facebookAuth
  }
}
