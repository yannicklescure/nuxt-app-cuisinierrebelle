<template>
  <div v-if="show">
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
      // items: undefined
    }
  },
  async asyncData(context) {
    // await context.store.dispatch('users/getUser', context.params.slug)
    const userData = await context.$axios({
      validateStatus: status => {
        // console.log(status)
        return status < 500; // Resolve only if the status code is less than 500
      },
      method: 'get',
      url: `https://api.cuisinierrebelle.com/v1/users/${ context.params.slug }`,
    })
    console.log(userData)
    const user = userData.data.data
    return { user }
  },
  async fetch () {
    if (this.recipes.length == 0) this.getStoreData()
    await this.getUser(this.$route.params.slug)
  },
  head() {
    if (this.user) {
      return {
        meta: [
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: this.user.name
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: 'Partagez vos recettes dès maintenant en toute simplicité'
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: this.user.image.openGraph.url
          },
          {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            content: this.user.name
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.user.name
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: 'Partagez vos recettes dès maintenant en toute simplicité'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.user.image.openGraph.url
          },
          {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: this.user.image.openGraph.url
          },
          {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: this.user.name
          }
        ]
      }
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
    // user () {
    //   return this.usersFilter(this.$route.params.slug)
    // },
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
