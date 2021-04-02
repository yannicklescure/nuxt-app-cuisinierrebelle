<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <SocialHead
        :title="'Recettes Sociales !'"
        :description="'Partagez vos recettes dès maintenant en toute simplicité'"
        :image="'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'"
      />
      <Banner v-if="!isAuthenticated" />
      <Cards v-if="recipes.length > 0" :recipes="recipes" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      recipes: 'recipes/listSorted',
      timestamp: 'timestamp',
    }),
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      fetchNotifications: 'notifications/list',
    }),
  },
  async fetch () {
    let refresh = true
    if (this.timestamp != null) refresh = new Date().getTime() - this.timestamp > 60*1000*3 // 3 minutes
    if (refresh) {
      const response = await this.getStoreData()
      console.log(response)
    }
  },
  mounted () {
    this.show = true
  }
}
</script>
