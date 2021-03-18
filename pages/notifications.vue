<template>
  <div :key="componentKey">
    <div v-if="show == false" class="d-flex justify-content-center m-5">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" variant="muted"></b-spinner>
    </div>
    <div v-if="show" class="container py-2">
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Notifications',
  data() {
    return {
      componentKey: 0,
      show: false,
    }
  },
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      items: 'notifications/listSorted',
    }),
  },
  methods: {
    ...mapActions({
      fetchItems: 'notifications/list'
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
    // fetchItems () {
    //   console.log('fetching notifications data')
    //   this.show = false
    //   this.$store
    //     .dispatch('notifications/list', {})
    //     .then( response => {
    //       console.log(response)
    //       this.show = true
    //     })
    // },
  },
  // watch: {
  //   async '$route' () {
  //     console.log(this.$route.params.id)
  //     await this.fetchItem()
  //   }
  // },
  async fetch() {
    await this.fetchItems()
  },
  mounted() {
    this.show = true
    // this.$nextTick(() => {})
  },
}
</script>
