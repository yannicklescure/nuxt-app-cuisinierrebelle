<template>
  <div class="container">
    <div class="h1 text-capitalize">admin</div>
    <NuxtLink to="/admin/pages">Gestion des pages</NuxtLink>

    <div>
      <h1>Hello Nuxters! 👋</h1>
      <p>
        This page is rendered on the <strong>{{ rendering }}</strong>
      </p>
      <p v-if="rendering === 'server'">
        First load or hard refresh is done on server side.
      </p>
      <p v-if="rendering === 'client'">Navigation is done on client side.</p>
      <ul>
        <li>Refresh the page for server side rendering.</li>
        <li>Click the links to see client side rendering.</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  middleware: ['authenticated', 'admin'],
  asyncData() {
    return {
      rendering: process.server ? 'server' : 'client'
    }
  }
}
</script>
