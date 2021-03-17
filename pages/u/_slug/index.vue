<template>
  <div v-if="show">
    <!-- <span>{{ theUser.name }}</span> -->
    <SocialHead
      v-if="user"
      :title="user.name"
      :description="'Partagez vos recettes dès maintenant en toute simplicité'"
      :image="user.image.openGraph.url"
    />
    <UsersBanner v-if="user" :user="user" />
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
  // async asyncData({ params }) {
  //   const slug = params.slug
  //   return { slug }
  // },
  data() {
    return {
      show: false,
      // componentKey: 0,
      // data: [],
      // busy: false,
    }
  },
  computed: {
    ...mapGetters({
      // currentUser: 'users/sessions/current',
      // isMobile: 'isMobile',
      recipes: 'recipes/list',
      userRecipes: 'recipes/user',
      usersFilter: 'users/filter',
      users: 'users/list',
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
    },
    items () {
      return this.userRecipes(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      getUser: 'users/getUser',
    }),
  },
  async created() {
    await this.getUser(this.$route.params.slug)
    if (this.recipes.length == 0) await this.getStoreData()
  },
  mounted() {
    this.show = true
  }
}
</script>
