<template>
  <div ref="card" class="card">
    <div class="card-body">
      <img :src="item.recipe.photo.card.url" :width="cardWidth" :height="cardHeight" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['item'],
    data() {
      return {
        cardWidth: 0,
        cardHeight: 0
      }
    },
    mounted() {
      this.cardWidth = this.$refs.card.clientWidth
      this.cardHeight = parseInt(this.cardWidth / 1.618)
    }
  }
</script>

<style scoped>
  img {
    object-fit: cover;
  }
  .card {
    min-height: 100%;
  }

  .card-body {
    padding: 0;
  }
</style>
