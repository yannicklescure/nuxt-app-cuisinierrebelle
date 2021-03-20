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
  // data() {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //   }
  // },
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      recipes: 'recipes/top100',
    }),
  },
  methods: {
    ...mapActions(['getStoreData']),
  },
  async fetch() {
    if (this.recipes.length == 0) await this.getStoreData()
  },
}
</script>
