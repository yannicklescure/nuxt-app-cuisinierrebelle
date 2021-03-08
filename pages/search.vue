<template>
  <div>
    <div class="container">
      <div v-if="items.length > 0" class="row">
        <div v-for="item in items" :key="item.timestamp" class="col-12 col-md-4 col-lg-3">
          <Card :item="item" />
        </div>
      </div>
      <div v-else class="py-3" v-html="$t('search.noResult', { query: $route.query.r })"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Search',
  // data () {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //   }
  // },
  // middleware: 'authenticated',
  methods: {
    ...mapActions(['getStoreData']),
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      items: 'search/result',
    }),
  },
  // created () {
    // if (this.items.length == 0) this.getStoreData()
  // },
}
</script>
