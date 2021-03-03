<template>
  <div>
    <Banner />
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
    ...mapActions(['getStoreData'])
  },
  created () {
    this.getStoreData()
  },
  computed: {
    ...mapGetters({
      items: 'recipes/listSorted',
    }),
  },
}
</script>

<style>
/*.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}*/

.col-12, .col-md-4, .col-lg-3 {
  padding: 8px 16px;
}

</style>
