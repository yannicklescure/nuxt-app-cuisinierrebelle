<template>
  <div>
    <Cards v-if="recipes.length > 0" :recipes="recipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Top100',
  // data () {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //   }
  // },
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      recipes: 'recipes/top100',
      timestamp: 'timestamp'
    }),
  },
  methods: {
    ...mapActions(['getStoreData']),
  },
  async fetch () {
    let refresh = true
    if (this.timestamp != null) refresh = new Date().getTime() - this.timestamp > 60*1000*3
    if (refresh) await this.getStoreData()
  },
}
</script>
