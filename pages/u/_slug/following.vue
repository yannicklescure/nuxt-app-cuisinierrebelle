<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <UsersBanner :user="user" />
      <div class="container" ref="container">
        <div class="px-md-3 px-md-5">
          <table class="table table-borderless">
            <tbody
              v-if="items.length > 0"
              v-for="(item, index) in items"
              :key="item.id"
            >
              <UsersCard :item="item" />
            </tbody>
            <InfiniteScroll :enough="enough" @load-more="getData()">
              <template>
                <span>{{ $t('init.loading') }}</span>
              </template>
            </InfiniteScroll>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserFollowing',
  middleware: 'authenticated',
  data () {
    return {
      enough: false,
      items: [],
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
    users () {
      return this.user.following.data
    }
  },
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
    }),
    getData () {
      const qty = this.items.length + 20 > this.users.length ? this.users.length - this.items.length : 20
      if (qty != 20) this.enough = true
      this.items = this.items.concat(this.users.slice(this.items.length, this.items.length + qty))
    }
  },
  async fetch () {
    await this.getUser(this.$route.params.slug)
    this.show = true
  },
  mounted () {
    this.getData()
  }
}
</script>
