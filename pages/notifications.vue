<template>
  <div :key="componentKey">
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else class="container py-2">
      <div v-for="item, i in items" class="d-flex flex-column">
        <div class="d-flex align-items-start rounded bg-light my-2 p-2">
          <NuxtLink :to="`/u/${ item.user.slug }`">
            <img
              :src="item.user.image.thumb.url"
              class="rounded-circle"
              width="32"
              height="32"
              style="object-fit: cover;"
            >
           </NuxtLink>
          <div class="ml-3 d-flex flex-column">
            <div class="d-flex align-items-center" style="font-size: 90%;">
              <NuxtLink
                v-if="item.type === 'recipe'"
                :to="`${ item.slug }`"
                class="text-body"
              >{{ $t('notifications.like.recipe', { user: item.user.name }) }}</NuxtLink>
              <NuxtLink
                v-if="item.type === 'comment'"
                :to="`${ item.slug }`"
                class="text-body"
              >{{ $t('notifications.like.comment', { user: item.user.name }) }}</NuxtLink>
              <NuxtLink
                v-if="item.type === 'reply'"
                :to="`${ item.slug }`"
                class="text-body"
              >{{ $t('notifications.like.reply', { user: item.user.name }) }}</NuxtLink>
            </div>
            <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
            <div class="small text-muted">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <InfiniteScroll :enough="enough" @load-more="getData()">
        <template>
          <span>{{ $t('init.loading') }}</span>
        </template>
      </InfiniteScroll>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Notifications',
  data () {
    return {
      componentKey: 0,
      enough: false,
      items: [],
      show: false,
    }
  },
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      notifications: 'notifications/listSorted',
    }),
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/list'
    }),
    timeAgo (time) {
      const between = Math.trunc((new Date().getTime() - time) / 1000)
      if (between < 3600) {
        return this.$tc('comments.minutes', Math.trunc(between / 60))
      } else if (between < 86400) {
        return this.$tc('comments.hours', Math.trunc(between / 3600))
      } else if (between < 2592000) {
        return this.$tc('comments.days', Math.trunc(between / 86400))
      } else if (between < 31104000) {
        return this.$tc('comments.months', Math.trunc(between / 2592000))
      } else {
        return this.$tc('comments.years', Math.trunc(between / 311004000))
      }
    },
    getData () {
      const qty = this.items.length + 20 > this.notifications.length ? this.notifications.length - this.items.length : 20
      if (qty != 20) this.enough = true
      this.items = this.items.concat(this.notifications.slice(this.items.length, this.items.length + qty))
    }
  },
  async fetch () {
    await this.fetchNotifications()
    this.show = true
  },
  mounted () {
    this.getData()
  },
}
</script>
