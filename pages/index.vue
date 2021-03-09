<template>
  <div>
    <Banner v-if="isAuthenticated == false" />
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

export default {
  name: 'Home',
  data() {
    return {
      // items: [],
      fetchedData: null
    }
  },
  // middleware: 'authenticated',
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchItems: 'notifications/list'
    }),
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      getItems: 'recipes/listSorted',
    }),
    items () {
      return this.isAuthenticated ? this.getItems : this.getItems.slice(0, 24)
    }
  },
  async created () {
    if (this.items.length == 0) await this.getStoreData()
    if (this.isAuthenticated) this.fetchItems()
  },
}
</script>
