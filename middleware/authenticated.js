export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.isAuthenticated) {
    return redirect('/login')
  }
}
