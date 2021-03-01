import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const getters = {
  page (state) {
    return keyword => state.list.filter( item => {
      return item.slug === keyword
    })[0];
  },
  pages (state) {
    return state.pages.sort((a, b) => (a.title > b.title) ? 1 : -1)
  },
}

export const mutations = {
  setPages: (state, payload) => {
    state.pages = payload.data.pages
  },
  pageNew: (state, payload) => {
    state.pages.push(payload.data)
  },
  pageEdit: (state, payload) => {
    const page = state.pages.filter(r => r.id === payload.data.id)[0]
    // console.log(page)
    if (page) {
      const position = state.pages.indexOf(page)
      // console.log(position)
      state.pages[position] = payload.data
    }
  },
}

export const actions = {
  async getPages(context, payload) {
    return await api.fetchPages(context, payload)
      .then(response => {
        context.commit("setPages", response.data)
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  pageNew: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageNew(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("pageNew", response)
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
  pageEdit: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageEdit(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("pageEdit", response)
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },
}
