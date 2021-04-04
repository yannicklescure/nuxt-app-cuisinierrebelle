<template>
  <div :class="['text-body d-flex align-items-center justify-content-center', { 'flex-column': $device.isMobile }]">
    <i :class="['material-icons', $device.isMobile ? 'md-32' : 'md-18']">person_pin</i>
    <span :class="['text-muted font-weight-lighter small', { 'ml-1': !$device.isMobile }]">{{ views }}</span>
  </div>
</template>

<script>
export default {
  name: 'BtnVisit',
  props: ['item'],
  computed: {
    views () {
      const views = this.item.recipe.views
      if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`
      } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`
      } else {
        return `${(views)}`
      }
    }
  },
  methods: {
    recipeLog () {
      this.$store
        .dispatch('RECIPE_LOG', this.item)
        .then((response) => {
          this.views = response.data.views
        })
    }
  }
}
</script>
