export default function ({ store, redirect, route }) {
  console.log(store)
  console.log(route)
  // If the user is not authorized
  if ((/.*\/r\/.*\/edit/).test(route.path)) {
    const position = store.getters['recipes/listSorted'].findIndex(item => item.recipe.slug == route.params.slug)
    console.log(position)
    if (position > -1 && store.state.users.sessions.user.slug != store.getters['recipes/listSorted'][position].user.slug) {
      return redirect('/')
    }
  }

  if ((/.*\/u\/.*/).test(route.path) && store.state.users.sessions.user.slug != route.params.slug) {
    return redirect('/')
  }
}
