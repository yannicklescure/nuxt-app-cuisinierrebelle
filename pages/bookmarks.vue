<template>
  <div class="container">
    <div class="row">
      <div v-for="item in items" :key="item.timestamp" class="col-12 col-md-4 col-lg-3">
        <Card :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Bookmarks',
  // data() {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //   }
  // },
  middleware: 'authenticated',
  methods: {
    ...mapActions(['getStoreData']),
  },
  computed: {
    ...mapGetters({
      // navbarHeight: 'navbarHeight',
      items: 'users/sessions/bookmarks',
    }),
  },
  async fetch() {
    if (this.items.length == 0) await this.getStoreData()
  },
}
</script>
