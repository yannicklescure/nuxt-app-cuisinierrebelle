<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'RegistrationConfirmation',
  data () {
    return {
      // componentKey: 0,
      // navbarHeight: 0,
      message: null,
    }
  },
  methods: {
    ...mapActions({
      registrationConfirmation: 'registrationConfirmation',
    }),
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
    confirmRegistration () {
      this.registrationConfirmation({ token: this.$route.query.confirmation_token })
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            this.$toast.info(this.$t('RegistrationConfirmation.success', { firstName: capitalize(response.data.first_name) }), {
              position: 'bottom-center',
              duration: 3000,
            })
            this.$router.push({ path: '/login' })
          }
          else {
            this.$toast.error(response.error, {
              position: 'bottom-center',
              duration: 3000,
            })
            this.$router.push({ path: '/' })
          }
        })
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'navbarHeight',
  //   ]),
  // },
  beforeMount () {
    if (this.$route.query.confirmation_token) this.confirmRegistration()
    else {
      this.$router.push({ path: '/login' })
    }
  },
  // mounted () {
  //   // this.navbarHeight = this.getNavbarHeight()
  // }
}
</script>
