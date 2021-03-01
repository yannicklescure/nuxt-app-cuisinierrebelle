import * as api from '~/api'

export const state = () => ({
  list: []
})

export const mutations = {
  notifications: (state, payload) => {
    for (const [key, value] of Object.entries(payload.data)) {
      state.data.notifications[key] = payload.data[key]
    }
  },
}

export const actions = {
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
}

export const getters = {
  notifications (state) {
    return state.list
  },
}

export const plugins = [
]
