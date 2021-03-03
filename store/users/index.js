import * as api from '~/api'

export const state = () => ({
  list: [],
})

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
        if (response.status === 200) context.commit("list", response.data)
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
        if (response.status === 204) context.commit("delete", payload)
        return response
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
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}

export const getters = {
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

export const plugins = []
