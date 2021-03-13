<template>
  <div class="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
    <div class="container">
      <div id="banner-cta-box" class="text-center">
        <div class="h2 text-white text-center" v-html="$t('banner.introduction')"></div>
      </div>
      <div id="banner-cta-box-btn" class="d-flex mt-3 justify-content-center flex-column flex-md-row">
        <NuxtLink
          to="/signup"
          class="btn btn-lg btn-info mt-3 mx-3 mt-md-0"
        >{{ $t('banner.getStarted') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
