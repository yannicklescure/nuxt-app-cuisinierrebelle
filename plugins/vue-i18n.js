import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import { messages } from '~/locales'
// console.log(messages())
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages: messages(), // set locale messages
})
