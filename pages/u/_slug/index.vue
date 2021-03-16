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
  data () {
    return {
      show: false,
      // componentKey: 0,
      // data: [],
      // busy: false,
      theUser: {
        name: ''
      }
    }
  },
  // async asyncData(context) {
  //   const userData = await context.$axios.$get(`https://api.cuisinierrebelle.com/v1/users/${ context.params.slug }`)
  //   console.log(userData)
  //   const theUser = userData.data
  //   return { theUser }
  // },
  async fetch () {
    // await this.$store.dispatch('users/getUser', this.$route.params.slug)
    await this.getUser(this.$route.params.slug)
    if (this.recipes.length == 0) await this.getStoreData()
    // console.log(this.$route.params.slug)
    // const userData = await this.$axios.$get(`https://api.cuisinierrebelle.com/v1/users/${ this.$route.params.slug }`)
    // this.theUser = userData.data

    // this.$store.commit("users/user", { data: this.user })
  },
  // async created () {
    // await this.getUser(this.$route.params.slug)
  // },
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
      // fetchItems: 'notifications/list'
    }),
    // setItem () {
    //   this.items = this.recipes(this.$route.params.slug)
    // },
  },
  mounted () {
    this.show = true
  }
}
</script>
