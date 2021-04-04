<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else-if="show">
      <SocialHead
        :title="user.name"
        :description="'Partagez vos recettes dès maintenant en toute simplicité'"
        :image="user.image.openGraph.url"
      />
      <UsersBanner
        :user="user"
        :count="userRecipes.length"
      />
      <Cards v-if="recipes.length > 0" :recipes="userRecipes" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      show: false
    }
  },
  async fetch () {
    await this.getUser(this.$route.params.slug)
    let refresh = true
    if (this.timestamp != null) {
      refresh = new Date().getTime() - this.timestamp > 60 * 1000 * 3
    }
    if (refresh) {
      await this.getStoreData()
    }
    this.show = true
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/list',
      getUserRecipes: 'recipes/user',
      usersFilter: 'users/filter',
      users: 'users/list',
      timestamp: 'timestamp'
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
      getUser: 'users/getUser'
    })
  }
}
</script>
