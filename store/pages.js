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
    return await this.$axios.$get('https://api.cuisinierrebelle.com/v1/pages')
      .then(response => {
        this.commit("pages/setPages", response)
        return response
      })
      .catch(({ response: error }) => {
        console.log(error)
      })
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
    return await this.$axios.$post(`https://api.cuisinierrebelle.com/v1/pages/`, formData, {})
    .then(response => {
      console.log(response)
      this.commit("pages/new", response)
      this.$axios.setHeader('Content-Type', false)
      return response
    })
    .catch(({ response: error }) => {
      console.log(error)
    })
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
    return await this.$axios.$patch(`https://api.cuisinierrebelle.com/v1/pages/${ payload.id }`, formData, {})
    .then(response => {
      console.log(response)
      this.commit("pages/edit", response)
      this.$axios.setHeader('Content-Type', false)
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
