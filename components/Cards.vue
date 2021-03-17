<template>
  <div>
    <div class="container">
      <div class="row">
        <div v-for="item in items" :key="item.timestamp" class="col-12 col-md-4 col-lg-3">
          <LazyCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cards',
  // middleware: 'authenticated',
  data() {
    return {
      // items: [],
      // fetchedData: null
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      getItems: 'recipes/listSorted',
    }),
    items () {
      return this.isAuthenticated ? this.getItems : this.getItems.slice(0, 12)
    }
  },
  // methods: {
  //   ...mapActions({
  //     getStoreData: 'getStoreData',
  //     // fetchItems: 'notifications/list'
  //   }),
  // },
  // async created() {
  //   if (this.items.length == 0) this.getStoreData()
  //   // if (this.isAuthenticated) this.fetchItems()
  // },
}
</script>
