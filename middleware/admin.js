export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.users.sessions.user.admin) {
    return redirect('/')
  }
}
