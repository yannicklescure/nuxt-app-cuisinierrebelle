<template>
  <div v-if="isAuthenticated">
    <div
      v-if="isFollowing"
      class="btn btn-sm btn-secondary"
      @click="unfollow"
    >
      {{ $t('follow.unfollow') }}
    </div>
    <div
      v-else
      class="btn btn-sm btn-dark"
      @click="follow"
    >
      {{ $t('follow.follow') }}
    </div>
  </div>
  <div v-else>
    <NuxtLink to="/login" class="btn btn-sm btn-dark">
      {{ $t('follow.follow') }}
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Follow',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current'
    }),
    isFollowing () {
      return this.currentUser.following.data.filter(f => f.slug === this.item.slug).length > 0
    }
  },
  methods: {
    follow () {
      this.$store
        .dispatch('users/sessions/follow', { user: this.item.slug })
    },
    unfollow () {
      this.$store
        .dispatch('users/sessions/unfollow', { user: this.item.slug })
    }
  }
}
</script>
