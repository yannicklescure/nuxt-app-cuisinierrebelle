<template>
  <div
    v-if="show"
    :key="componentKey"
    class="container"
  >
    <h1>{{ $t('userDelete.title') }}</h1>
    <p>{{ $t('userDelete.text1') }}</p>
    <p>{{ $t('userDelete.text2') }}<a href="mailto:contact@cuisinierrebelle.com">{{ $t('userDelete.text3') }}</a>{{ $t('userDelete.text4') }}</p>
    <p>{{ $t('userDelete.text5') }}</p>
    <form>
      <div class="form-group mb-3">
        <label for="inputPageContent">{{ $t('userDelete.form') }}</label>
        <textarea id="inputPageContent" v-model="content" :maxlength="max" class="form-control" rows="5" />
        <small id="contentHelpBlock" class="form-text text-muted">
          {{ $tc('page.new.contentHelp', (max - content.length)) }}
        </small>
      </div>
      <div class="form-group mb-3">
        <label for="inputEmail">{{ $t('userDelete.email') }}</label>
        <input
          id="inputEmail"
          v-model="email"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          @input="checkForm"
        >
      </div>
      <div class="form-check mb-5">
        <input id="checkbox" v-model="checked" type="checkbox" class="form-check-input" @change="checkForm">
        <label for="checkbox" class="form-check-label">{{ $t('userDelete.checkbox') }}</label>
      </div>
      <div class="form-group mb-3 d-flex justify-content-center justify-content-md-start">
        <button type="submit" class="btn btn-dark" :disabled="disabled" @click.stop.prevent="deleteAccount">
          {{ $t('userDelete.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      show: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current'
    })
  },
  mounted () {
    this.show = true
  },
  methods: {
    checkForm () {
      if (this.checked === true && (this.email === this.currentUser.email)) {
        this.disabled = false
        return true
      } else {
        this.disabled = true
        return false
      }
    },
    logout () {
      this.$store.commit('users/sessions/logOut', {})
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
    },
    deleteAccount () {
      const checkForm = this.checkForm()
      if (checkForm) {
        const payload = {
          content: this.content
        }
        this.$store.dispatch('users/sessions/delete', payload)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.info(this.$t('userDelete.success'), {
                position: 'bottom-center',
                duration: 3000 // Visibility duration in milliseconds
              })
              // this.$router.push({ name: 'Home' })
              this.logout()
            } else if (response.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(response.response)
            } else if (response.request) {
              // client never received a response, or request never left
              this.errors.push(response.request)
            } else {
              // anything else
              this.errors.push(response)
            }
          })
      } else {
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000 // Visibility duration in milliseconds
        })
      }
    }
  }
}
</script>
