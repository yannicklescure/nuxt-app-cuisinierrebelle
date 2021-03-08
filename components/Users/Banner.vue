<template>
  <div class="container p-3"  id="user-banner">
    <div v-if="user" class="d-flex justify-content-between p-2 p-md-3 bg-light rounded">
      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <img :src="user.image.preview.url" :alt="user.name" class="rounded" width="64" height="64" style="object-fit: cover;">
        <div class="ml-3 d-flex flex-column">
          <div class="d-flex align-items-center">
            <NuxtLink :to="'/u/' + user.slug" class="text-capitalize text-body">{{ user.name }}</NuxtLink>
            <span v-if="user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
              <i class="material-icons md-16">check_circle</i>
            </span>
          </div>
          <div>
            <NuxtLink
              :to="'/u/' + user.slug + '/followers'"
              @click.native="getUsers"
              class="d-flex align-items-center text-decoration-none text-muted"
            >
              <small>{{ $tc('userBanner.followers', countFollowers) }}</small>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <div v-if="user.slug === currentUser.slug">
          <div class="btn" v-on:click="userSettings">
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
// import Follow from '../components/buttons/Follow.vue'
// const Follow = () => import('../components/buttons/Follow.vue')

export default {
  name: 'UsersBanner',
  props: ['user'],
  // data () {
  //   return {}
  // },
  // components: {
  //   Follow,
  // },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
    }),
    countFollowers () {
      return this.user.followers.count
    }
  },
  methods: {
    getUsers () {
      this.$store
        .dispatch('users/getUsers', {})
        .then(response => {
          console.log(response)
        })
    },
    userSettings () {
      this.$router.push({ name: 'UserSettings' })
    }
  },
}
</script>
