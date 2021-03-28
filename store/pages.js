import * as api from '~/api'

export const state = () => ({
  list: [],
})

export const mutations = {
  setPages (state, payload) {
    state.list = payload.data.pages
  },
  new (state, payload) {
    state.list.push(payload)
  },
  edit (state, payload) {
    const position = state.list.findIndex(r => r.id === payload.id)
    state.list[position] = payload
  },
}

export const actions = {
  async get () {
    const response = await this.$axios.$get(`${ process.env.apiUrl }/v1/pages`)
    this.commit("pages/setPages", response)
    return response
  },
  async new (context, payload) {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('locale', payload.locale);
    console.log(formData)
    // this.$axios.setToken(this.state.users.sessions.authorization.authorizationToken, 'Bearer')
    this.$axios.setHeader('Authorization', `Bearer ${ this.state.users.sessions.authorization.authorizationToken }`)
    this.$axios.setHeader('Content-Type', 'multipart/form-data')
    const response = await this.$axios.$post(`${ process.env.apiUrl }/v1/pages/`, formData, {})
    console.log(response)
    this.commit("pages/new", response)
    this.$axios.setHeader('Content-Type', false)
    return response
  },
  async edit (context, payload) {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('locale', payload.locale);
    console.log(formData)
    // this.$axios.setToken(this.state.users.sessions.authorization.authorizationToken, 'Bearer')
    this.$axios.setHeader('Authorization', `Bearer ${ this.state.users.sessions.authorization.authorizationToken }`)
    this.$axios.setHeader('Content-Type', 'multipart/form-data')
    const response = await this.$axios.$patch(`${ process.env.apiUrl }/v1/pages/${ payload.id }`, formData, {})
    console.log(response)
    this.commit("pages/edit", response)
    this.$axios.setHeader('Content-Type', false)
    return response
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
