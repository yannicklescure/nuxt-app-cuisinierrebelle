<template>
  <div ref="card" class="card">
    <CardHead :item="item" />
    <CardBody :item="item" :dimension="dimension" />
    <CardFooter :item="item" />
  </div>
</template>

<script>
// const CardBody = () => import('../components/cards/CardBody.vue')
// const CardHead = () => import('../components/cards/CardHead.vue')
// const CardFooter = () => import('../components/cards/CardFooter.vue')

export default {
  name: 'card',
  props: ['item'],
  data () {
    return {
      dimension: {
        width: 0,
        height: 0
      }
    }
  },
  // components: {
  //   CardBody,
  //   CardHead,
  //   CardFooter,
  // },
  methods: {
    matchInfoBox () {
      this.dimension.width = this.$refs.card.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
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
  mounted () {
    // this.$nextTick(() => {
      // console.log('card ready')
      this.matchInfoBox()
      this.$emit('cardReady', this.item.recipe.id)
    // })
  }
}
</script>

<style>
</style>
