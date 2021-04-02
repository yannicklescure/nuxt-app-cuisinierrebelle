<template>
  <div class="mb-2 d-flex justify-content-center justify-content-md-center align-items-center flex-column">
    <div
      ref="banner"
      :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ imageUrl }')`"
      class="banner-background banner-height d-flex flex-column w-100 justify-content-between bg-light"
    >
      <BannerCta />
      <BannerUnsplash :image="image" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Banner',
  // props: ['image'],
  computed: {
    ...mapGetters({
      image: 'banner/image'
    }),
    viewport () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      return {
        height: vh,
        width: vw
      }
    },
    imageUrl () {
      return `${this.image.url}&w=${this.viewport.width}&h=${this.viewport.height}&fm=webp`
    }
  },
  methods: {
    ...mapActions({
      getBannerImage: 'banner/get'
    })
  },
  async fetch () {
    const obj = this.$store.state.banner.image
    if (obj.id == null || !obj.timestamp || parseInt(new Date().getTime() - obj.timestamp) > 1000 * 60 * 60 * 24) {
      await this.getBannerImage()
    }
  }
}
</script>
