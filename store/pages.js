import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  setPages: (state, payload) => {
    state.list = payload.data.pages
  },
  pageNew: (state, payload) => {
    state.list.push(payload.data)
  },
  pageEdit: (state, payload) => {
    const page = state.list.filter(r => r.id === payload.data.id)[0]
    // console.log(page)
    if (page) {
      const position = state.list.indexOf(page)
      // console.log(position)
      state.list[position] = payload.data
    }
  },
}

export const actions = {
  fetch: (context, payload) => {
    return api.fetchPages(context, payload)
      .then(response => {
        context.commit("setPages", response.data)
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
  new: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageNew(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("pageNew", response)
        }
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
  edit: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageEdit(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("pageEdit", response)
        }
        return response
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export const getters = {
  filter (state) {
    return keyword => state.list.slice().filter( item => {
      return item.slug === keyword
    })[0];
  },
  all (state) {
    return state.list.slice().sort((a, b) => (a.title > b.title) ? 1 : -1)
  },
}
