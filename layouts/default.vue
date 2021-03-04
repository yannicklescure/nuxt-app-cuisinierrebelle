<template>
  <div ref="default" id="default">
    <div v-if="show">
      <NavbarMobile v-if="isMobile" />
      <NavbarDesktop v-else />
      <Nuxt />
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
