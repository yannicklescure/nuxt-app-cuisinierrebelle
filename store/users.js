import * as api from '~/api'

export const state = () => ({
  list: [],
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

const clearUserData = (state) => {
  state.user = {
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
  state.authorization = {
    authorizationToken: null,
    refreshToken: null,
    expireAt: null
  }
  state.isAuthenticated = false

  return state
}

export const mutations = {
  list: (state, payload) => {
    state.users = payload.data.users
  },
  delete: (state, payload) => {
    // console.log('userDelete')
  },
  notifications: (state, payload) => {
    // console.log(payload.data.notification)
    state.data.user.notification = payload.data.notification
  },
}

export const actions = {
  list: (context, payload) => {
    // console.log(context.state.data.user)
    return api.users(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("users/list", response.data)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  delete: (context, payload) => {
    console.log(context.state.data)
    return api.userDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 204) context.commit("users/delete", payload)
        return response
      })
  },
  notifications: (context, payload) => {
    // console.log(payload)
    return api.userNotifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("users/notifications", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
  current (state) {
    return state.user
  },
  recipes (state) {
    return keyword => state.recipes.filter( item => {
      return item.user.slug === keyword
    })
    .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  filter (state) {
    return keyword => state.users.filter( user => {
      return user.slug === keyword
    })[0];
  },
}

export const plugins = [
]
