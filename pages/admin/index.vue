<template>
  <div class="container">
    <div class="h1 text-capitalize">
      {{ title }}
    </div>
    <p>current logged in user: {{ currentUser.email }}</p>
    <div v-if="currentUser.admin">
      <NuxtLink to="/admin/pages">
        Gestion des pages
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',
  middleware: ['authenticated', 'admin'],
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current'
    }),
    title () {
      let str = ''
      if (this.currentUser.admin) {
        str = 'admin dashboard'
      }
      if (this.currentUser.moderator) {
        str = 'moderator dashboard'
      }
      return str
    }
  }
}
</script>
