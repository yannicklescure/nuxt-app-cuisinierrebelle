<template>
  <div ref="card" class="card">
    <img :src="item.recipe.photo.card.url" :height="cardHeight" style="object-fit: cover" alt="">
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
