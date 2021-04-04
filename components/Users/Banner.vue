<template>
  <div id="user-banner" class="container p-3">
    <div v-if="user" class="d-flex justify-content-between p-2 p-md-3 bg-light rounded">
      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <img
          :src="user.image.preview.url"
          :alt="user.name"
          class="rounded"
          width="64"
          height="64"
          style="object-fit: cover;"
        >
        <div class="ml-3 d-flex flex-column">
          <div class="d-flex align-items-center">
            <NuxtLink
              :to="`/u/${ user.slug }`"
              class="text-capitalize text-body"
            >
              {{ user.name }}
            </NuxtLink>
            <span v-if="user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
              <i class="material-icons md-16">verified_user</i>
            </span>
          </div>
          <div class="small text-secondary">
            {{ $t('user.banner.memberSince', { date: userCreatedAt(user.createdAt) }) }}
          </div>
          <div class="d-flex align-items-center text-secondary">
            <small>{{ $tc('userBanner.recipes', count) }}</small>
            <span>&nbsp;/&nbsp;</span>
            <NuxtLink
              :to="`/u/${ user.slug }/followers`"
              class="d-flex align-items-center text-decoration-none text-secondary"
            >
              <small>{{ $tc('userBanner.followers', countFollowers) }}</small>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <div v-if="user.slug === currentUser.slug">
          <div class="btn" @click="userSettings">
            <span class="material-icons md-24 d-flex">settings</span>
          </div>
        </div>
        <div v-else>
          <BtnFollow :item="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UsersBanner',
  props: {
    user: {
      type: Object,
      default: null
    },
    count: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current'
    }),
    countFollowers () {
      return this.user.followers.count
    }
  },
  methods: {
    userCreatedAt: (timestamp) => {
      // console.log(timestamp)
      if (!timestamp) {
        return null
      }
      const date = new Date(timestamp)
      const year = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date)
      const month = new Intl.DateTimeFormat('fr', { month: 'long' }).format(date)
      // const day = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date)

      return `${month} ${year}`
    },
    userSettings () {
      this.$router.push({ path: `/u/${this.currentUser.slug}/settings` })
    }
  }
}
</script>
