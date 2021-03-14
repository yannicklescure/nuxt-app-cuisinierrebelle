<template>
  <div class="mb-2 d-flex justify-content-center justify-content-md-center align-items-center flex-column">
    <div
      ref="banner"
      :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ imageUrl }')`"
      class="banner-background banner-height d-flex flex-column w-100 justify-content-between bg-light"
    >
      <BannerCta />
      <LazyBannerUnsplash :image="image" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
// import { fetchBannerPicture } from '../api'
// import Unsplash, { toJson } from 'unsplash-js';
// const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });
// import { unsplash, getBannerPicture } from '../util/unsplash'

export default {
  name: 'Banner',
  // props: ['displayCards'],
  // data () {
  //   return {
  //     loading: true,
  //   }
  // },
  methods: {
    ...mapActions({
      getBannerImage: 'banner/getBannerImage'
    }),
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      bannerImage: 'banner/bannerImage',
    }),
    viewport () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      return {
        height: vh,
        width: vw,
      }
    },
    image () {
      return this.bannerImage
    },
    imageUrl () {
      return `${ this.image.url }&w=${ this.viewport.width }&h=${ this.viewport.height }&fm=webp`
    },
  },
  created () {
    this.getBannerImage()
  },
  // created() {
  //   this.loadImg()
  // },
  // beforeMount () {
  // },
  // mounted () {
  //   this.$nextTick(() => {
  //     // this.$refs.banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ this.imageUrl }')`
  //     // this.setImage()
  //     // const preload = document.querySelector('#banner-skeleton')
  //     // if (preload) preload.replaceWith(this.$refs.banner)
  //     // if (preload) preload.insertAdjacentHTML('afterbegin', this.$refs.banner.innerHTML)
  //   })
  // }
}
</script>
