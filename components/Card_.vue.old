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
    methods: {
      matchInfoBox () {
        this.cardWidth = this.$refs.card.clientWidth
        this.cardHeight = parseInt(this.cardWidth / 1.618)
      }
    },
    created() {
      if (process.client) {
        window.addEventListener("resize", this.matchInfoBox);
      }
    },
    destroyed() {
      if (process.client) {
        window.removeEventListener("resize", this.matchInfoBox);
      }
    },
    mounted() {
      this.$nextTick(() => {
        // The whole view is rendered, so I can safely access or query
        // the DOM. ¯\_(ツ)_/¯
        this.matchInfoBox()
      })
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
