import axios from 'axios'

const apiUrl = 'https://api.cuisinierrebelle.com'
const version = 'v1'

export const userNotifications = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/notification/${payload.id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      notification: payload.notification,
    }
  })
}

export const notifications = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/notifications`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
  })
}

export const commentLike = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const commentUnlike = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const commentDelete = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const replyLike = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
}

export const replyUnlike = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
}

export const replyEdit = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      comment_id: payload.comment_id,
      user_id: payload.user_id,
      content: payload.content,
    }
  })
}

export const replyDelete = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
}

export const replyNew = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments/${ payload.comment_id }/replies`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const commentEdit = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/comments/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const commentNew = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/comments`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const bookmark = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/bookmarks`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const unbookmark = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/bookmarks/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {}
  })
}

export const follow = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/${ payload.user }/follow`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const unfollow = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/users/${ payload.user }/unfollow`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const like = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const unlike = async (context, payload) => {
  console.log(context)
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/likes/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {}
  })
}

export const followers = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/users/${payload}/followers`,
  })
}

export const recipe = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/recipes/${payload}`,
  })
}

export const user = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/users/${ payload }`,
  })
}

export const users = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/users`,
  })
}

export const fetchBannerImage = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/unsplash_images`,
  })
}

export const fetchPages = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/pages`,
  })
}

export const pageNew = async (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/pages`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const pageEdit = async (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/pages/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipeDelete = async (context, payload) => {
  // console.log(payload)
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ apiUrl }/${ version }/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const recipeEdit = async (context, payload) => {
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
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ apiUrl }/${ version }/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipeNew = async (context, payload) => {
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
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/recipes`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

export const recipes = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/recipes`,
  })
}

export const recipeLog = async (context, payload) => {
  // console.log(context)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/${ version }/recipe_logs`,
    headers: {
      //
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
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

export const confirmRegistration = async (context, payload) => {
  // console.log(`${ apiUrl }/${ version }/search`)
  return await axios({
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

export const signUp = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ apiUrl }/api/${ version }/users`,
    headers: {
    },
    data: payload
  })
}

export const facebookLogin = async (context, payload) => {
  return await axios({
    validateStatus: status => {
      // console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ apiUrl }/${ version }/facebook`,
    headers: {
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    params: payload
  })
}

export const passwordResetVerification = async (context, payload) => {
  return await axios({
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

export const passwordReset = async (context, payload) => {
  return await axios({
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

export const requestPasswordReset = async (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return await axios({
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

export const resendConfirmationInstructions = async (context, payload) => {
  return await axios({
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

export const refreshAccessToken = async (context, payload) => {
  return await axios({
    method: 'post',
    url: `${ apiUrl }/users/tokens`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken
    },
  })
}

export const login = async (context, payload) => {
  return await axios({
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

export const logout = async (context, payload) => {
  return await axios({
    method: 'delete',
    url: `${ apiUrl }/users/sign_out`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
    }
  })
}

export const userDelete = async (context, payload) => {
  return await axios({
    method: 'delete',
    // url: `${ apiUrl }/api/${ version }/users`,
    url: `${ apiUrl }/users/delete`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
    data: {
      content: payload.content
    }
  })
}

export const search = async (context, payload) => {
  // console.log(`${ apiUrl }/${ version }/search`)
  return await axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/search`,
    params: {
      query: payload.query
    },
  })
}

export const getStoreData = async (context, payload) => {
  // console.log(`${ apiUrl }/${ version }/state`)
  return await axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/state`,
    headers: {
      // 'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
  })
}

export const isAuthenticated = async (context, payload) => {
  return await axios({
    method: 'get',
    url: `${ apiUrl }/${ version }/users/status`,
    headers: {
      'Authorization': `Bearer ${ context.rootState.users.sessions.authorization.authorizationToken }`,
      // 'Refresh-Token': context.rootState.users.sessions.authorization.refreshToken,
    },
  })
}
