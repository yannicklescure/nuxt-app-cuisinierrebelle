<template>
  <div>
    <UsersBanner v-if="show" :user="user" />
    <div v-if="show" class="container" ref="container">
      <div class="px-md-3 px-md-5">
        <table class="table table-borderless">
          <tbody
            v-if="items.length > 0"
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
  name: 'UserFollowing',
  middleware: 'authenticated',
  data() {
    return {
      show: false
    }
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
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
    }),
  },
  async fetch() {
    const response = await this.getUser(this.$route.params.slug)
    console.log(response)
    if (response.status == 200) this.show = true
  },
}
</script>
