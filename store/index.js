import * as api from '~/api'
import { isMobile } from 'mobile-device-detect'

// export const strict = false

export const state = () => ({
  lastUpdated: 0,
  render: {
    navbarHeight: 0,
  },
  timestamp: null,
})

export const mutations = {
  setStoreData: (state, payload) => {
    // console.log(state)
    // for (const [key, value] of Object.entries(payload.data)) {
    //   // state[key] = payload.data[key]
    //   state[key] = value
    // }
    state.lastUpdated = payload.data.lastUpdated
    state.recipes.list = payload.data.recipes
    state.users.list = payload.data.users
    state.users.sessions.isAuthenticated = payload.data.isAuthenticated
    state.timestamp = payload.data.timestamp
  },
  navbarHeight: (state, payload) => {
    state.render.navbarHeight = payload
    // context.commit("navbarHeight", navbarHeight)
  },
}

export const actions = {
  async getStoreData (context, payload) {
    // console.log('get store data')
    await api.fetchState()
      .then(response => {
        // console.log(response)
        context.commit("setStoreData", response.data)
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
  // FACEBOOK_logIn: (context, payload) => {
  //   const loginUser = payload => {
  //     console.log(payload)
  //     // LOGIN USER
  //     return api.login(context, payload)
  //       .then(response => {
  //         if (response.status === 200) context.commit("logIn", response)
  //         return response
  //       })
  //       .catch(error => {
  //         // console.log(error)
  //         return error
  //       })
  //   }

  //   return api.facebookLogin(context, payload)
  //     .then(response => {
  //       console.log(response)
  //       if (response.data.isUser) {
  //         console.log(response)
  //         const payload = {
  //           authResponse: response.data.authResponse,
  //           user: {
  //             email: response.data.user.email,
  //             password: null
  //           }
  //         }
  //         console.log(payload)
  //         return loginUser(payload)
  //       }
  //       else {
  //         // CREATE USER
  //         // response.data.isFacebookUser = true
  //         // response.data.authResponse = response.data.authResponse
  //         // response.data.user.password = { accessToken: response.data.authResponse.accessToken }
  //         // console.log(response.data.user)
  //         const payload = {
  //           authResponse: response.data.authResponse,
  //           user: {
  //             first_name: response.data.user.firstName,
  //             last_name: response.data.user.lastName,
  //             email: response.data.user.email,
  //             // password: response.data.user.password,
  //             // confirmation: response.data.user.confirmation,
  //           }
  //         }
  //         console.log(payload)
  //         return api.signUp(context, payload)
  //           .then(response => {
  //             console.log(response)
  //             const payload = {
  //               authResponse: response.data.authResponse,
  //               user: {
  //                 email: response.data.user.email,
  //                 password: null
  //               }
  //             }
  //             return loginUser(payload)
  //           })
  //           .catch(error => {
  //             // console.log(error)
  //             return error
  //           })
  //       }
  //       // return response
  //     })
  //     .catch(error => {
  //       // console.log(error)
  //       return error
  //     })
  // },
  RESEND_CONFIRMATION_INSTRUCTIONS: (context, payload) => {
    // console.log(context.state)
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
  navbarHeight: (context, payload) => {
    context.commit("navbarHeight", payload)
    // localStorage.setItem('cuisinier_rebelle', JSON.stringify(context.state))
  },
}

export const getters = {
  timestamp () {
    return state.timestamp
  },
  isMobile () {
    return isMobile
  },
  navbarHeight (state) {
    // console.log(state)
    return state.render.navbarHeight
  },
  // countRecipeComments (state) {
  //   return item => {
  //     const counts = item.comments.map(comment => comment.replies.length)
  //     let sum = counts.length
  //     counts.map(res => sum += res)
  //     return sum
  //   }
  // },
}
