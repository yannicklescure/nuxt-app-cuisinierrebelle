import { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

// const oldStore = [
//   'cuisinier_rebelle',
//   'vueStore',
//   'storageKey',
//   'cr_sk_20210216',
//   'cr_sk_20210217',
//   'cr_sk_20210303'
// ]

// let oldStoreFlag = false

// oldStore.forEach(store => {
//   if (localStorage.getItem(store) != null) {
//     localStorage.removeItem(store)
//     oldStoreFlag = true
//   }
// })

// if (oldStoreFlag) {
//   location.reload()
// }

const storageKey = 'cr_secure_ls';

// const storage = window.localStorage
const storage = {
  getItem: (key) => ls.get(key),
  setItem: (key, value) => ls.set(key, value),
  removeItem: (key) => ls.remove(key),
}

export default ({store}) => {
  createPersistedState({
    key: storageKey,
    storage: storage,
  })(store)
}
