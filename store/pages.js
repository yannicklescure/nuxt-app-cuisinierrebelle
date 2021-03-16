import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  setPages (state, payload) {
    state.list = payload.data.pages
  },
  pageNew (state, payload) {
    state.list.push(payload.data)
  },
  pageEdit (state, payload) {
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
  async fetch () {
    return await this.$axios.$get('https://api.cuisinierrebelle.com/v1/pages')
      .then(response => {
        this.commit("pages/setPages", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  new (context, payload) {
    // console.log(context.state.data.user)
    return api.pageNew(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("pageNew", response)
        }
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
  },
  async edit (context, payload) {
    console.log(this)
    console.log(context)
    console.log(payload)
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('locale', payload.locale);
    console.log(formData)
    // this.$axios.setToken(this.state.users.sessions.authorization.authorizationToken, 'Bearer')
    this.$axios.setHeader('Authorization', `Bearer ${ this.state.users.sessions.authorization.authorizationToken }`)
    this.$axios.setHeader('Content-Type', 'multipart/form-data')
    return await this.$axios.$patch(`https://api.cuisinierrebelle.com/v1/pages/${ payload.id }`, formData, {})
    .then(response => {
      console.log(response)
      if (response.status === 204) {
        this.commit("pageEdit", response)
        this.$axios.setHeader('Content-Type', false)
      }
      return response
    })
    .catch(({ response: error }) => {
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
