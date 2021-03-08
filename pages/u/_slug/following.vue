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
import { mapGetters } from 'vuex'

export default {
  name: 'UserFollowers',
  middleware: 'authenticated',
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  data () {
    return {
      componentKey: 0,
      data: [],
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      usersFilter: 'users/filter',
    }),
    user () {
      return this.usersFilter(this.slug)
    },
    items () {
      return this.user.following.data.slice(0, 100)
    }
  },
  mounted () {
    this.show = true
  }
}
</script>
