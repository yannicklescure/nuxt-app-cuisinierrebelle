<template>
  <div>
    <UsersBanner :user="user" />
    <div class="container" ref="container">
      <div class="px-md-3 px-md-5">
        <table class="table table-borderless">
          <tbody
            v-for="(item, index) in items"
            :key="item.id"
          >
            <UsersCard :item="item" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserFollowers',
  middleware: 'authenticated',
  // async asyncData({ params }) {
  //   const slug = params.slug
  //   return { slug }
  // },
  data() {
    return {
      componentKey: 0,
      data: [],
      show: false,
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      getUser: 'users/getUser',
      // fetchItems: 'notifications/list'
    }),
  },
  computed: {
    ...mapGetters({
      usersFilter: 'users/filter',
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
    },
    items () {
      return this.user.following.data.slice(0, 100)
    }
  },
  async created() {
    await this.getUser(this.$route.params.slug)
  },
  mounted() {
    this.show = true
  }
}
</script>
