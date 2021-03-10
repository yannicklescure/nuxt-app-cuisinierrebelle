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
  // async asyncData({ params }) {
  //   const slug = params.slug
  //   return { slug }
  // },
  // data () {
  //   return {
  //     // componentKey: 0,
  //     // data: [],
  //     // busy: false,
  //     // items: undefined
  //   }
  // },
  head() {
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
          content: this.user.image.preview.url
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
          content: this.user.image.preview.url
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.user.image.preview.url
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.user.name
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      isMobile: 'isMobile',
      recipes: 'recipes/user',
      usersFilter: 'users/filter',
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
    },
    items () {
      return this.recipes(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      // fetchItems: 'notifications/list'
    }),
    // setItem () {
    //   this.items = this.recipes(this.$route.params.slug)
    // },
  },
  async created () {
    // await this.setItem()
    // if (this.items == undefined) {
      // console.log(this.item)
      await this.getStoreData()
      // this.setItem()
    // }
  },
}
</script>
