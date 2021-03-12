<template>
  <div class="d-flex justify-content-center text-muted">
    <div class="d-block mb-3">
      <div class="d-flex justify-content-center align-items-center">
          <span class="small">Photo by&nbsp;</span>
          <a
            :href="'https://unsplash.com/@' + image.user.username + '?utm_source=cuisinier_rebelle&utm_medium=referral&utm_campaign=api-credit'"
            target="_blank"
            class="text-light small"
          >{{ image.user.name }}</a>
          <span class="small">&nbsp;on&nbsp;</span>
          <a
            :href="'https://unsplash.com/?utm_source=cuisinier_rebelle&utm_medium=referral'"
            target="_blank"
            class="text-light small"
          >Unsplash</a>
          <a
            :href="image.link.download"
            target="_blank"
            class="ml-2 text-light text-decoration-none"
          >
            <span class="material-icons md-16 d-flex">get_app</span>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
}
</script>
