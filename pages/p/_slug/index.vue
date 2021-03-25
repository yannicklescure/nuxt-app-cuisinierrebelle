<template>
  <div class="container">
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div
      v-else
      class="container"
      :key="componentKey"
    >
      <div v-if="item">
        <div v-if="!isMobile && currentUser.admin" class="d-flex justify-content-center align-items-center my-3">
          <NuxtLink :to="`/p/${ $route.params.slug }/edit`" class="text-body text-capitalize text-decoration-none" >{{ $t('pages.edit') }}</NuxtLink>
        </div>
        <div>
          <vue-markdown-plus :source="item.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueMarkdownPlus from 'vue-markdown-plus'

export default {
  name: 'Page',
  data() {
    return {
      componentKey: 0,
    }
  },
  components: {
    VueMarkdownPlus,
  },
  computed: {
    ...mapGetters({
      page: 'pages/filter',
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
    }),
    item () {
      return this.page(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      fetchItems: 'pages/get'
    }),
  },
  async fetch() {
    await this.fetchItems()
  },
}
</script>
