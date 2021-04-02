<template>
  <div :class="['text-body d-flex align-items-center justify-content-center', { 'flex-column': isMobile }]">
    <i :class="['material-icons', isMobile ? 'md-32' : 'md-18']">person_pin</i>
    <span :class="['text-muted font-weight-lighter small', { 'ml-1': !isMobile }]">{{ views }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { isMobile } from 'mobile-device-detect'

export default {
  name: 'BtnVisit',
  props: ['item'],
  // data () {
  //   return {
  //     // views: 0,
  //   }
  // },
  computed: {
    ...mapGetters(['isMobile']),
    // isMobile () {
      // return isMobile
    // },
    views () {
      const views = this.item.recipe.views
      if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
      else if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
      else return `${(views)}`
    }
  },
  methods: {
    recipeLog () {
      this.$store
        .dispatch('RECIPE_LOG', this.item)
        .then(response => {
          console.log(response)
          this.views = response.data.views
        })
    },
  },
  // beforeMount () {
  //   // this.recipeLog()
  // },
  // updated () {
  //   // this.recipeLog()
  // }
}
</script>
