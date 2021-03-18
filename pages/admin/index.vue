<template>
  <div class="container">
    <div class="h1 text-capitalize">admin</div>
    <NuxtLink to="/admin/pages">Gestion des pages</NuxtLink>
    <p v-if="theUser.name != null">{{ theUser.name }}</p>
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
    const user = await this.$axios.$get(`https://api.cuisinierrebelle.com/v1/users/yannicklescure`)
    this.theUser = user.data
  },
}
</script>
