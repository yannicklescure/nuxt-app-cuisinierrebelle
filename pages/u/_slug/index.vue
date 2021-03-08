<template>
  <div>
    <UsersBanner :user="user" />
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

// const Cards = () => import('../components/Cards.vue')

export default {
  name: 'User',
  // middleware: 'authenticated',
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  // data () {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //   }
  // },
  methods: {
    ...mapActions(['getStoreData']),
    setItem () {
      this.items = this.recipes(this.slug)
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipes: 'recipes/user',
      usersFilter: 'users/filter',
    }),
    user () {
      return this.usersFilter(this.slug)
    },
  },
  async created () {
    await this.setItem()
    if (this.item == undefined) {
      // console.log(this.item)
      await this.getStoreData()
      this.setItem()
    }
  },
}
</script>
