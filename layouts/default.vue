<template>
  <div ref="default" id="default">
    <NavbarMobile v-if="isMobile" />
    <NavbarDesktop v-else />
    <Nuxt v-if="show"/>
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
      this.$refs.default.style.paddingTop = `${ parseInt(this.navbarHeight) + 8 }px`
      console.log(this.$refs.default.style)
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
