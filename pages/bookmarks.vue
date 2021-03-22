<template>
  <div>
    <Cards v-if="recipes.length > 0" :recipes="recipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Bookmarks',
  middleware: 'authenticated',
  methods: {
    ...mapActions(['getStoreData']),
  },
  computed: {
    ...mapGetters({
      recipes: 'users/sessions/bookmarks',
    }),
  },
  async fetch() {
    if (this.recipes.length == 0) await this.getStoreData()
  },
}
</script>
