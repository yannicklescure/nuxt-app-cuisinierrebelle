<template>
  <div class="container">
    <div class="h1 text-capitalize">admin</div>
    <NuxtLink to="/admin/pages/">Gestion des pages</NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  middleware: ['authenticated', 'admin'],
}
</script>
