import axios from 'axios'

export const userNotifications = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${process.env.apiUrl}/v1/notification/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      notification: payload.notification
    }
  })
}

export const notifications = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/notifications`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const commentLike = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/likes`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const commentUnlike = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/likes/0`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const commentDelete = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const replyLike = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/replies/${payload.reply_id}/likes`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const replyUnlike = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/replies/${payload.reply_id}/likes/0`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const replyEdit = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/replies/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe_id,
      comment_id: payload.comment_id,
      user_id: payload.user_id,
      content: payload.content
    }
  })
}

export const replyDelete = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/replies/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const replyNew = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/comments/${payload.comment_id}/replies`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      comment_id: payload.comment_id,
      content: payload.content
    }
  })
}

export const commentEdit = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${process.env.apiUrl}/v1/comments/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content
    }
  })
}

export const commentNew = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/comments`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content
    }
  })
}

export const bookmark = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/bookmarks`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      bookmark: {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id
      }
    }
  })
}

export const unbookmark = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/bookmarks/${payload.recipe_id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    }
  })
}

export const follow = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/users/${payload.user}/follow`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const unfollow = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/users/${payload.user}/unfollow`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    params: {
      user_slug: payload.user
    }
  })
}

export const followers = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/users/${payload}/followers`
  })
}

export const user = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/users/${payload}`
  })
}

export const users = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/users`
  })
}

export const recipeDelete = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${process.env.apiUrl}/v1/recipes/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const recipeEdit = async (context, payload) => {
  const FormData = require('form-data')
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('subtitle', payload.subtitle)
  formData.append('video', payload.video)
  formData.append('direction', payload.direction)
  formData.append('description', payload.description)
  formData.append('photo', payload.photo)
  formData.append('tag_list', payload.tagList)
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${process.env.apiUrl}/v1/recipes/${payload.id}`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const recipeNew = async (context, payload) => {
  const FormData = require('form-data')
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('subtitle', payload.subtitle)
  formData.append('video', payload.video)
  formData.append('direction', payload.direction)
  formData.append('description', payload.description)
  formData.append('photo', payload.photo)
  formData.append('tag_list', payload.tagList)
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/recipes`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const recipes = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/recipes`
  })
}

export const recipeLog = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/recipe_logs`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      recipe_id: payload.recipe.id,
      user_id: context.getters.currentUser ? context.getters.currentUser.id : null,
      recipe_log: {
        recipe_id: payload.recipe.id,
        user_id: context.getters.currentUser ? context.getters.currentUser.id : null
      }
    }
  })
}

export const confirmRegistration = async (context, payload) => {
  return await axios({
    method: 'get',
    url: `${process.env.apiUrl}/api/v1/users/confirmation`,
    params: {
      confirmation_token: payload.token
    }
  })
}

export const signUp = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/api/v1/users`,
    data: payload
  })
}

export const facebookLogin = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${process.env.apiUrl}/v1/facebook`,
    params: payload
  })
}

export const passwordResetVerification = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/users/password/reset_verification`,
    data: payload
  })
}

export const passwordReset = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/users/password/reset`,
    data: payload
  })
}

export const requestPasswordReset = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/v1/users/password/request`,
    data: payload
  })
}

export const resendConfirmationInstructions = async (context, payload) => {
  return await axios({
    validateStatus: (status) => {
      return status < 500 // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${process.env.apiUrl}/users/resend_confirmation_instructions`,
    data: payload
  })
}

export const userDelete = async (context, payload) => {
  return await axios({
    method: 'delete',
    url: `${process.env.apiUrl}/users/delete`,
    headers: {
      Authorization: `Bearer ${context.rootState.users.sessions.authorization.authorizationToken}`
    },
    data: {
      content: payload.content
    }
  })
}
