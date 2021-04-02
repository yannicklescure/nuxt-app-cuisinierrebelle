<template>
  <div>
    <div class="container">
      <div class="row">
        <div v-for="item in items" :key="item.timestamp" class="col-12 col-md-4 col-lg-3">
          <LazyCard :item="item" />
        </div>
        <InfiniteScroll :enough="enough" @load-more="getData()">
          <template>
            <span>{{ $t('init.loading') }}</span>
          </template>
        </InfiniteScroll>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cards',
  props: ['recipes'],
  data () {
    return {
      items: [],
      enough: false,
      page: 1,
      pageSize: 10,
    }
  },
  watch: {
    recipes () {
      this.items = []
      this.enough = false
      this.page = 1
      this.pageSize = 10
      this.getData()
    }
  },
  // computed: {
  //   ...mapGetters({
  //     // isAuthenticated: 'users/authentication/isAuthenticated',
  //     // recipes: 'recipes/listSorted',
  //   }),
  //   // items () {
  //   //   return this.isAuthenticated ? this.recipes : this.recipes.slice(0, 12)
  //   // }
  // },
  methods: {
    getData () {
      const qty = this.items.length + 12 > this.recipes.length ? this.recipes.length - this.items.length : 12
      if (qty != 12) this.enough = true
      this.items = this.items.concat(this.recipes.slice(this.items.length, this.items.length + qty))
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
