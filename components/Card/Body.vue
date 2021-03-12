<template>
  <div class="card-body bg-white p-0">
    <NuxtLink :to="`/r/${ item.recipe.slug }`">
      <img
        ref="lazyImage"
        :class="['card-img-top d-flex justify-content-center align-items-center']"
        :data-src="item.recipe.photo.card.url"
        :width="dimension.width"
        :height="dimension.height"
        :style="`object-fit: cover;`"
        :alt="item.recipe.slug"
      >
    </NuxtLink>
  </div>
</template>

<script>

export default {
  name: 'CardBody',
  props: ['item', 'dimension'],
  mounted () {
    this.$nextTick(() => {
      this.$refs.lazyImage.src = this.$refs.lazyImage.dataset.src
    })
  }
}
</script>
