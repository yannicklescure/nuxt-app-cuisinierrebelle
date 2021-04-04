export default function ({ store, $axios, redirect }) {
  $axios.onError((error) => {
    // console.log(error)
    if (error.response.status === 422) {
      redirect('/login')
    }
    if (error.response.status === 500) {
      redirect('/404')
    }
  })

  $axios.onResponse((response) => {
    // console.log(response)
    if (response.status === 200) {
      if (response.headers['access-token']) {
        store.commit('users/sessions/refreshAccessToken', response)
      }
      // redirect('/')
    }
  })
}
