<template>
  <div v-if="show">
    <SocialHead
      v-if="user"
      :title="user.name"
      :description="'Partagez vos recettes dès maintenant en toute simplicité'"
      :image="user.image.openGraph.url"
    />
    <UsersBanner v-if="user" :user="user" />
    <Cards v-if="recipes.length > 0" :recipes="userRecipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'User',
  // middleware: 'authenticated',
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      // currentUser: 'users/sessions/current',
      // isMobile: 'isMobile',
      recipes: 'recipes/list',
      getUserRecipes: 'recipes/user',
      usersFilter: 'users/filter',
      users: 'users/list',
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
    },
    userRecipes () {
      return this.getUserRecipes(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      getUser: 'users/getUser',
    }),
  },
  async fetch() {
    await this.getUser(this.$route.params.slug)
    if (this.recipes.length == 0) await this.getStoreData()
  },
  mounted() {
    this.show = true
  }
}
</script>
