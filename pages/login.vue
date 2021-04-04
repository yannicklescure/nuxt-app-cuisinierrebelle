<template>
  <div>
    <SocialHead
      :title="'Recettes Sociales !'"
      :description="'Partagez vos recettes dès maintenant en toute simplicité'"
      :image="'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'"
    />
    <div class="container d-flex cr-vh100">
      <div class="d-flex flex-grow-1 justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center w-md-50">
          <div v-if="!connecting">
            <form>
              <div class="form-group my-2">
                <label for="inputEmail">{{ $t('login.email') }}</label>
                <input
                  id="inputEmail"
                  v-model="email"
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                >
                <small id="emailHelp" class="form-text text-muted">{{ $t('login.disclaimer') }}</small>
              </div>
              <label for="inputPassword">{{ $t('signUp.password') }}</label>
              <div class="input-group mb-3">
                <input
                  ref="password"
                  v-model="password"
                  type="password"
                  class="form-control"
                  aria-describedby="button-password"
                  @input="allowPost"
                  @touchend="allowPost"
                >
                <div class="input-group-append">
                  <button
                    id="button-password"
                    type="button"
                    class="btn btn-outline-form"
                    @click="showPassword"
                  >
                    <i
                      ref="passwordIcon"
                      class="material-icons md-18 d-flex"
                    >visibility_off</i>
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <b-button v-if="posting" variant="dark w-100" disabled>
                  <b-spinner small />
                  <span class="sr-only">Loading...</span>
                </b-button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-dark my-2 w-100"
                  :disabled="disabled"
                  @click.stop.prevent="login"
                >
                  {{ $t('login.submit') }}
                </button>
              </div>
            </form>
            <div class="my-3 d-flex flex-column justify-content-center align-items-center">
              <button
                v-if="error"
                class="btn btn-link"
                @click.stop.prevent="resendConfirmationInstructions"
              >
                {{ $t('login.password.request.resendConfirmationInstructions') }}
              </button>
              <NuxtLink to="/users/password/new">
                {{ $t('login.forgetPassword') }}
              </NuxtLink>
              <NuxtLink to="/signup">
                {{ $t('login.signup') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// const FacebookLogin = () => import('../components/buttons/Facebook.vue')

const capitalize = (s) => {
  if (typeof s !== 'string') {
    return ''
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'Login',
  data () {
    return {
      connecting: false,
      disabled: true,
      email: null,
      password: null,
      errors: [],
      error: false,
      posting: false
    }
  },
  computed: {
    ...mapGetters([
      'navbarHeight'
    ])
  },
  beforeMount () {
    if (this.$store.state.users.authentication.isAuthenticated) {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    isConnecting (value) {
      this.connecting = value
    },
    allowPost () {
      if (this.email && this.password) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    showPassword () {
      if (this.$refs.password.type === 'text') {
        this.$refs.password.type = 'password'
        this.$refs.passwordIcon.innerText = 'visibility_off'
      } else {
        this.$refs.password.type = 'text'
        this.$refs.passwordIcon.innerText = 'visibility'
        setTimeout(() => {
          this.showPassword()
        }, 3000)
      }
    },
    validateEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
        return false
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
        return false
      }
      if (!this.password) {
        this.errors.push(this.$t('signUp.errors.password'))
        return false
      }
      if (this.password.split('').length < 3) {
        this.errors.push(this.$t('signUp.errors.passwordLength'))
        return false
      }
      return true
    },
    async resendConfirmationInstructions () {
      this.errors = []
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
      }
      if (this.errors.length > 0) {
        this.error = true
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000
        })
      } else {
        const payload = {
          user: {
            email: this.email
          }
        }
        await this.$store.dispatch('resendConfirmationInstructions', payload)
          .then((result) => {
            if (result.status === 200) {
              this.$toast.success(this.$t('login.resendConfirmationInstructions', { email: result.data.email }), {
                position: 'bottom-center',
                duration: 3000
              })
              this.email = null
              this.password = null
              this.$router.push({ path: '/' })
            } else {
              this.errors.push(result.data.error)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.error = true
              this.$toast.error(this.errors[0], {
                position: 'bottom-center',
                duration: 3000
              })
            }
          })
      }
    },
    async login () {
      const checkForm = this.checkForm()
      if (checkForm) {
        this.disabled = true
        this.posting = true
        const payload = {
          email: this.email,
          password: this.password
        }
        const response = await this.$store.dispatch('users/sessions/logIn', payload)
        if (response.email === payload.email) {
          const firstName = capitalize(response.first_name)
          this.$toast.success(this.$t('login.welcome', { firstName }), {
            position: 'bottom-center',
            duration: 3000
          })
          this.email = null
          this.password = null
          this.$router.push({ path: '/' })
        } else {
          this.disabled = false
        }
      } else {
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000
        })
      }
    }
  }
}
</script>
