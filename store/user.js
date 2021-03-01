import * as api from '~/api'

export const state = () => ({
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
  userDelete: (state, payload) => {
    // console.log('userDelete')
  },
  userNotifications: (state, payload) => {
    // console.log(payload.data.notification)
    state.data.user.notification = payload.data.notification
  },
}

export const actions = {
  userDelete: (context, payload) => {
    console.log(context.state.data)
    return api.userDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 204) context.commit("userDelete", payload)
        return response
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
}

export const getters = {
  currentUser (state) {
    return state.user
  },
  userRecipes (state) {
    return keyword => state.recipes.filter( item => {
      return item.user.slug === keyword
    })
    .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  usersFilter (state) {
    return keyword => state.users.filter( user => {
      return user.slug === keyword
    })[0];
  },
}

export const plugins = [
]
