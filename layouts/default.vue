<template>
  <div ref="default" id="default">
    <div
      v-if="show"
      class="d-flex flex-column justify-content-between"
    >
      <NavbarMobile v-if="isMobile" />
      <NavbarDesktop v-else />
      <Nuxt />
      <LazyFooter />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      isMobile: 'isMobile',
    }),
  },
  watch: {
    'navbarHeight' () {
      this.adjustDivTop()
    }
  },
  methods: {
    adjustDivTop () {
      this.$refs.default.style.paddingTop = `${ parseInt(this.navbarHeight) }px`
      // this.$refs.default.style.minHeight = `100vh`
    }
  },
  mounted () {
    this.adjustDivTop()
    this.$nextTick(() => {
      this.show = true
      // console.log(this.$refs)
    })
  }
}
</script>
