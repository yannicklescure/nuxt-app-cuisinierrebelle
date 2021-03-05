import axios from 'axios'

const apiUrl = 'https://api.cuisinierrebelle.com'
const version = 'v1'

export const userNotifications = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/${ version }/notification/${payload.id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      notification: payload.notification,
    }
  })
}

export const notifications = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/${ version }/notifications`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
  })
}

export const commentLike = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const commentUnlike = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const commentDelete = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const replyLike = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
}

export const replyUnlike = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
}

export const replyEdit = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      comment_id: payload.comment_id,
      user_id: payload.user_id,
      content: payload.content,
    }
  })
}

export const replyDelete = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const replyNew = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      comment_id: payload.comment_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
}

export const commentEdit = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/comments/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
}

export const commentNew = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
}

export const bookmark = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/bookmarks`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      bookmark: {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
      }
    }
  })
}

export const unbookmark = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/bookmarks/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {}
  })
}

export const follow = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/${ payload.user }/follow`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const unfollow = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/${ payload.user }/unfollow`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const like = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      like: {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
      }
    }
  })
}

export const unlike = (context, payload) => {
  console.log(context)
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/likes/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {}
  })
}

export const followers = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/users/${payload}/followers`,
  })
}

export const recipe = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/recipes/${payload}`,
  })
}

export const users = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/users`,
  })
}

export const fetchBannerImage = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/unsplash_images`,
  })
}

export const fetchPages = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/pages`,
  })
}

export const pageNew = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/pages/`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const pageEdit = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/pages/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipeDelete = (context, payload) => {
  // console.log(payload)
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const recipeEdit = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('subtitle', payload.subtitle);
  formData.append('video', payload.video);
  formData.append('direction', payload.direction);
  formData.append('description', payload.description);
  formData.append('photo', payload.photo);
  formData.append('tag_list', payload.tagList);
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipeNew = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('subtitle', payload.subtitle);
  formData.append('video', payload.video);
  formData.append('direction', payload.direction);
  formData.append('description', payload.description);
  formData.append('photo', payload.photo);
  formData.append('tag_list', payload.tagList);
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/recipes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipes = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/recipes`,
  })
}

export const recipeLog = (context, payload) => {
  // console.log(context)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/recipe_logs`,
    headers: {
      //
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      // 'X-User-Email': context.getters.currentUser ? context.getters.currentUser.email : null,
      // 'X-User-Token': context.getters.currentUser ? context.getters.currentUser.authentication_token : null
    },
    data: {
      recipe_id: payload.recipe.id,
      user_id: context.getters.currentUser ? context.getters.currentUser.id : null,
      recipe_log: {
        recipe_id: payload.recipe.id,
        user_id: context.getters.currentUser ? context.getters.currentUser.id : null,
      }
    }
  })
}

export const confirmRegistration = (context, payload) => {
  // console.log(`${ apiUrl }/${ version }/search`)
  return axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/users/confirmation`,
    headers: {
      //
    },
    params: {
      confirmation_token: payload.token
    },
  })
}

export const signUp = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/api/v1/users`,
    headers: {
    },
    data: payload
  })
}

export const facebookLogin = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/facebook`,
    headers: {
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: payload
  })
}

export const passwordResetVerification = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/password/reset_verification`,
    headers: {
    },
    data: payload
  })
}

export const passwordReset = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/password/reset`,
    headers: {
    },
    data: payload
  })
}

export const requestPasswordReset = (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/password/request`,
    headers: {
    },
    data: payload
  })
}

export const resendConfirmationInstructions = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/users/resend_confirmation_instructions`,
    headers: {
    },
    data: payload
  })
}

export const refreshAccessToken = (context, payload) => {
  return axios({
    method: 'post',
    url: `${ apiUrl }/users/tokens`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken
    },
  })
}

export const login = (context, payload) => {
  return axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/users/sign_in`,
    headers: {
    },
    data: payload
  })
}

export const logout = (context, payload) => {
  return axios({
    method: 'delete',
    url: `${ apiUrl }/users/sign_out`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
    }
  })
}

export const userDelete = (context, payload) => {
  return axios({
    method: 'delete',
    url: `${ apiUrl }/${ version }/users`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      content: payload.content
    }
  })
}

export const search = (payload) => {
  // console.log(`${ apiUrl }/${ version }/search`)
  return axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/search`,
    params: {
      query: payload.query
    },
  })
}

export const fetchState = (payload) => {
  // console.log(`${ apiUrl }/${ version }/state`)
  return axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/state`,
    headers: {
    },
  })
}

export const isAuthenticated = (payload) => {
  return axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/users/status`,
    headers: {
      'Authorization': `Bearer ${ payload.authorizationToken }`,
      'Refresh-Token': payload.refreshToken
    },
  })
}
