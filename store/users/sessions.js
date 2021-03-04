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
}

export const actions = {
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
      .catch(error => {
        console.log(error)
        return error
      })
  },
  logOut: (context, payload) => {
    return api.logout(context, payload)
      .then(response => {
        console.log(response)
        if (response && response.status === 200) {
          context.commit("logOut", payload)
          context.commit("users/authentication/isAuthenticated", { data: { isAuthenticated: false } }, { root: true })
          return response
        }
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  refreshAccessToken: (context, payload) =>  {
    return api.refreshAccessToken(context, payload)
      .then(response => {
        // console.log(response.data.message)
        context.commit("refreshAccessToken", response)
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
  authorization (state) {
    return {
      authorizationToken: state.authorization.authorizationToken,
      refreshToken: state.authorization.refreshToken,
      expireAt: state.authorization.expireAt,
    }
  },
  facebookAuth (state) {
    return state.user.facebookAuth
  },
}

export const plugins = []
