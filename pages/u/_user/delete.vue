<template>
  <div
    class="container"
    :key="componentKey"
    v-if="show"
  >
    <h1>{{ $t('userDelete.title') }}</h1>
    <p>{{ $t('userDelete.text1') }}</p>
    <p>{{ $t('userDelete.text2') }}<a href="mailto:contact@cuisinierrebelle.com">{{ $t('userDelete.text3') }}</a>{{ $t('userDelete.text4') }}</p>
    <p>{{ $t('userDelete.text5') }}</p>
    <form>
      <div class="form-group mb-3">
        <label for="inputPageContent">{{ $t('userDelete.form') }}</label>
        <textarea v-model="content" :maxlength="max" class="form-control" id="inputPageContent" rows="5"></textarea>
        <small id="contentHelpBlock" class="form-text text-muted">
          {{ $tc('page.new.contentHelp', (max - content.length)) }}
        </small>
      </div>
      <div class="form-group mb-3">
        <label for="inputEmail">{{ $t('userDelete.email') }}</label>
        <input v-on:input="checkForm" v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
      </div>
      <div class="form-check mb-5">
        <input v-on:change="checkForm" class="form-check-input" type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox" class="form-check-label">{{ $t('userDelete.checkbox') }}</label>
      </div>
      <div class="form-group mb-3 d-flex justify-content-center justify-content-md-start">
        <button v-on:click.stop.prevent="deleteAccount" type="submit" class="btn btn-dark" :disabled="disabled">{{ $t('userDelete.submit') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// const UserNotifications = () => import('../components/UserNotifications.vue')

export default {
  name: 'UserDelete',
  middleware: ['authenticated', 'authorization'],
  data () {
    return {
      componentKey: 0,
      errors: [],
      checked: false,
      disabled: true,
      email: '',
      content: '',
      max: 1000,
      show: false,
    }
  },
  // components: {
  //   UserNotifications,
  // },
  methods: {
    checkForm () {
      // console.log(`checked ${!this.checked}`)
      // console.log(this.email)
      // console.log(this.currentUser.email)
      // console.log(this.checked && (this.email === this.currentUser.email))
      if (this.checked === true && (this.email === this.currentUser.email)) {
        this.disabled = false
        return true
      }
      else {
        this.disabled = true
        return false
      }
    },
    logout () {
      this.$store.dispatch('logOut', {})
        .then(response => {
          console.log(response)
          if (response.status === 204 && this.$route.path != '/') this.$router.push({ path: '/' })
        })
    },
    deleteAccount () {
      const checkForm = this.checkForm()
      if (checkForm) {
        const payload = {
          content: this.content,
        }
        this.$store.dispatch('users/sessions/delete', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$toast.info(this.$t('userDelete.success'), {
                position: 'bottom-center',
                duration: 3000, // Visibility duration in milliseconds
              })
              // this.$router.push({ name: 'Home' })
              this.logout()
            }
            else if (response.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(response.response)
            }
            else if (response.request) {
              // client never received a response, or request never left
              this.errors.push(response.request)
            }
            else {
              // anything else
              this.errors.push(response)
            }
          })
      }
      else {
        console.log(this.errors)
        this.$toast.error(this.errors[0], {
            position: 'bottom-center',
            duration: 3000, // Visibility duration in milliseconds
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
    }),
  },
  mounted () {
    this.show = true
  }
}
</script>
