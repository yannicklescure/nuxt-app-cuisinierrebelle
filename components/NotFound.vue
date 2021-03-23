<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center">
      <div class="display-1 mb-5">Oups !</div>
      <div class="h1" v-html="$t('notFound.title')"></div>
      <p v-html="$t('notFound.text1')"></p>
      <p v-html="$t('notFound.text2')"></p>
      <NuxtLink to="/p/plan-du-site" v-html="$t('notFound.sitemap')"></NuxtLink>
      <NuxtLink to="/" v-html="$t('notFound.home')"></NuxtLink>
      <NuxtLink to="/login" v-html="$t('notFound.login')"></NuxtLink>
    </div>
  </div>
</template>
