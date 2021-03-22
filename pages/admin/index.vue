<template>
  <div class="container">
    <p v-if="theUser.name != null">Current User: {{ theUser.name }}</p>
    <div class="h1 text-capitalize">admin</div>
    <NuxtLink to="/admin/pages">Gestion des pages</NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  data() {
    return {
      theUser: {
        name: null
      }
    }
  },
  middleware: ['authenticated', 'admin'],
  async fetch() {
    const currentUser = this.$store.getters['users/sessions/current']
    const user = await this.$axios.$get(`https://api.cuisinierrebelle.com/v1/users/${ currentUser.slug }`)
    this.theUser = user.data
  },
}
</script>
