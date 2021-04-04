<template>
  <div class="container d-flex cr-vh100">
    <div class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
      <div :class="[$device.isMobile ? 'h2' : 'h1', 'text-center']">
        {{ $t('login.password.reset.title') }}
      </div>
      <p v-if="firstName" class="form-text text-body text-wrap">
        {{ $t('login.password.reset.text0', { firstName: firstName }) }}
      </p>
      <div v-else>
        <p class="form-text text-body text-wrap">
          {{ $t('login.password.reset.text1') }}
        </p>
        <NuxtLink to="/users/password/new">
          {{ $t('login.forgetPassword') }}
        </NuxtLink>
      </div>
      <div v-if="firstName" class="d-flex flex-column align-items-center w-md-50">
        <form>
          <label for="inputPassword">
            {{ $t('signUp.password') }}
          </label>
          <div class="input-group mb-3">
            <input
              ref="password1"
              v-model="password"
              type="password"
              class="form-control"
              aria-describedby="button-password1"
            >
            <div class="input-group-append">
              <button
                id="button-password1"
                type="button"
                class="btn btn-outline-form"
                @click="showPassword1"
              >
                <i ref="password1Icon" class="material-icons md-18 d-flex">visibility_off</i>
              </button>
            </div>
          </div>
          <label for="inputPassword">{{ $t('signUp.confirmation') }}</label>
          <div class="input-group mb-3">
            <input
              ref="password2"
              v-model="confirmation"
              type="password"
              class="form-control"
              aria-describedby="button-password2"
              @input="allowPost"
              @touchend="allowPost"
            >
            <div class="input-group-append">
              <button
                id="button-password2"
                type="button"
                class="btn btn-outline-form"
                @click="showPassword2"
              >
                <i ref="password2Icon" class="material-icons md-18 d-flex">visibility_off</i>
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-dark my-2 w-100"
              :disabled="disabled"
              @click.stop.prevent="requestReset"
            >
              {{ $t('login.password.reset.submit') }}
            </button>
          </div>
        </form>
        <div class="my-3 d-flex flex-column justify-content-center align-items-center">
          <NuxtLink to="/login">
            {{ $t('login.submit') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const capitalize = (s) => {
  if (typeof s !== 'string') {
    return ''
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'PasswordReset',
  data () {
    return {
      disabled: true,
      token: this.$route.query.token,
      email: null,
      firstName: null,
      confirmation: null,
      password: null,
      errors: []
    }
  },
  async fetch () {
    if (this.token) {
      await this.requestResetVerification()
    }
  },
  methods: {
    showPassword1 () {
      if (this.$refs.password1.type === 'text') {
        this.$refs.password1.type = 'password'
        this.$refs.password1Icon.innerText = 'visibility_off'
      } else {
        this.$refs.password1.type = 'text'
        this.$refs.password1Icon.innerText = 'visibility'
        setTimeout(() => {
          this.showPassword1()
        }, 3000)
      }
    },
    showPassword2 () {
      if (this.$refs.password2.type === 'text') {
        this.$refs.password2.type = 'password'
        this.$refs.password2Icon.innerText = 'visibility_off'
      } else {
        this.$refs.password2.type = 'text'
        this.$refs.password2Icon.innerText = 'visibility'
        setTimeout(() => {
          this.showPassword2()
        }, 3000)
      }
    },
    allowPost () {
      if (this.password && this.confirmation) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    validateEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.password) {
        this.errors.push(this.$t('signUp.errors.password'))
        return false
      }
      if (this.password.split('').length < 8) {
        this.errors.push(this.$t('signUp.errors.passwordLength'))
        return false
      }
      if (this.password !== this.confirmation) {
        this.errors.push(this.$t('signUp.errors.confirmation'))
        return false
      }
      return true
    },
    requestReset () {
      const checkForm = this.checkForm()
      if (checkForm) {
        const payload = {
          user: {
            email: this.email,
            password: this.password,
            confirmation: this.confirmation,
            token: this.token
          }
        }
        this.$store.dispatch('users/authentication/passwordReset', payload)
          .then((response) => {
            if (response.status === 200) {
              if (response.data.success) {
                this.$toast.success(this.$t('login.password.reset.success', { email: this.email }), {
                  position: 'bottom-center',
                  duration: 3000
                })
                this.password = null
                this.confirmation = null
                this.$router.push({ path: '/login' })
              }
            } else if (response.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(response.status)
            } else if (response.request) {
              // client never received a response, or request never left
              this.errors.push(response.status)
            } else {
              // anything else
              this.errors.push(response)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.$toast.error(this.errors[0], {
                position: 'bottom-center',
                duration: 3000
              })
            }
          })
      } else {
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000
        })
      }
    },
    requestResetVerification () {
      const payload = {
        user: {
          token: this.token
        }
      }
      this.$store.dispatch('users/authentication/passwordResetVerification', payload)
        .then((response) => {
          if (response.status === 200) {
            this.email = response.data.user.email
            this.firstName = capitalize(response.data.user.firstName)
            this.token = response.data.user.token
          } else if (response.response) {
            // client received an error response (5xx, 4xx)
            this.errors.push(response.status)
          } else if (response.request) {
            // client never received a response, or request never left
            this.errors.push(response.status)
          } else {
            // anything else
            this.errors.push(response)
          }
        })
        .then(() => {
          if (this.errors.length > 0) {
            this.$toast.error(this.errors[0], {
              position: 'bottom-center',
              duration: 3000
            })
          }
        })
    }
  }
}
</script>
