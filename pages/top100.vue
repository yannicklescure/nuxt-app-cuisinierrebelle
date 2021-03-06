<template>
  <div>
    <div class="container">
      <div class="row">
        <div v-for="item in items" :key="item.timestamp" class="col-12 col-md-4 col-lg-3">
          <Card :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Top100',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      data: [],
      busy: false,
    }
  },
  middleware: 'authenticated',
  methods: {
    ...mapActions(['getStoreData']),
    // cardParams (value) {
    //   const cardWidth = value.params.width
    //   console.log(cardWidth)
    //   const containerWidth = this.$refs.container.offsetWidth
    //   console.log(containerWidth)
    //   console.log(containerWidth / cardWidth)
    // },
    loadMore () {
      if (this.data.length < this.items.length) {
        console.log('loadMore')
        this.busy = true;
        setTimeout(() => {
          const cards = 12
          const min = this.data.length
          const max = min + cards <= this.items.length ? min + cards : this.items.length
          // for (let i = min, j = max; i < j; i++) {
          //   this.data.push(this.items[i])
          // }
          this.data = this.data.concat(this.items.slice(min, max))
          this.busy = false;
        }, 0);
      }
    },
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      items: 'recipes/top100',
    }),
    // items () {
    //   const items = this.$store.getters.recipes
    //   // if (items && this.data.length === 0) this.data = items.slice(0, 12)
    //   return items
    // },
    // setData () {
    //   if (this.items.length > 0 && this.data.length === 0) {
    //     this.data = this.items.slice(0, 12)
    //     return true
    //   }
    //   return false
    // },
  },
  // watch: {
  //   top100 () {
  //     this.loadMore()
  //   }
  // },
  created () {
    if (this.items.length == 0) this.getStoreData()
  },
  // beforeMount () {
    // if (this.items.length > 0 && this.data.length === 0) this.loadMore()
    // console.log(this.$store.getters.recipes)
  // },
  // mounted () {
  //   this.$nextTick(() => {
  //     // this.navbarHeight = this.$store.getters.navbarHeight
  //     // console.log(this.$store.getters.navbarHeight)
  //     // console.log(this.$store.getters.recipes)
  //     // if (this.items.length > 0) console.log('items ready')
  //     setTimeout(() => {
  //       // this.loadMore()
  //       // while (!this.items && this.data.length === 0) this.loadMore()
  //     }, 1000)
  //   })
  // }
}
</script>
