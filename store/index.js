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

export const mutations = {
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

    const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.recipes.indexOf(recipe)
    state.recipes[position].recipe.likes += 1
  },
  unlike: (state, payload) => {
    // console.log(payload)
    // console.log(state)
    const like = state.user.likes.filter(like => like.recipe_id === payload.recipe_id)[0]
    let position = state.user.likes.indexOf(like)
    state.user.likes.splice(position, 1)
    // console.log(`user's likes: ${ state.user.likes.length }`)

    const recipe = state.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.recipes.indexOf(recipe)
    state.recipes[position].recipe.likes -= 1
  },
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
  top100 (state) {
    return state.recipes.slice().sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
}
