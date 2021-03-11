<template>
  <div class="container d-flex cr-vh100">
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <div class="d-flex flex-column align-items-center w-md-50">
        <!-- <div class="my-3"> -->
          <!-- <facebook-login v-on:isConnecting="isConnecting"/> -->
        <!-- </div> -->
        <div v-if="!connecting">
          <form>
            <div class="form-group my-2">
              <label for="inputEmail">{{ $t('login.email') }}</label>
              <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">{{ $t('login.disclaimer') }}</small>
            </div>
            <label for="inputPassword">{{ $t('signUp.password') }}</label>
            <div class="input-group mb-3">
              <input v-model="password" v-on:input="allowPost" v-on:touchend="allowPost" ref="password" type="password" class="form-control" aria-describedby="button-password">
              <div class="input-group-append">
                <button v-on:click="showPassword" class="btn btn-outline-form" type="button" id="button-password">
                  <i ref="passwordIcon" class="material-icons md-18 d-flex">visibility_off</i>
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                @click.stop.prevent="login"
                type="submit"
                class="btn btn-dark my-2 w-100"
                :disabled="disabled"
              >{{ $t('login.submit') }}</button>
            </div>
          </form>
          <div class="my-3 d-flex flex-column justify-content-center align-items-center">
            <button
              v-if="error"
              @click.stop.prevent="resendConfirmationInstructions"
              class="btn btn-link"
            >{{ $t('login.password.request.resendConfirmationInstructions') }}</button>
            <NuxtLink to="/users/password/new/">{{ $t('login.forgetPassword') }}</NuxtLink>
            <NuxtLink to="/signup/">{{ $t('login.signup') }}</NuxtLink>
            <p></p>
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
  if (typeof s !== 'string') return ''
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
    }
  },
  // components: {
    // FacebookLogin,
  // },
  created (store) {
    if (this.$store.state.users.authentication.isAuthenticated) {
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
    ]),
  },
  methods: {
    isConnecting (value) {
      this.connecting = value
    },
    allowPost () {
      if (this.email && this.password) this.disabled = false
      else this.disabled = true
    },
    showPassword () {
      if (this.$refs.password.type === "text") {
        this.$refs.password.type = "password"
        this.$refs.passwordIcon.innerText = "visibility_off"
      }
      else {
        this.$refs.password.type = "text"
        this.$refs.passwordIcon.innerText = "visibility"
        setTimeout(() => {
          this.showPassword()
        }, 3000)
      }
    },
    validateEmail (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
      // if (this.password != this.confirmation) {
      //   this.errors.push(this.$t('signUp.errors.confirmation'))
      //   return false
      // }
      return true
    },
    resendConfirmationInstructions () {
      this.errors = []
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
      }
      if (this.errors.length > 0) {
        this.error = true
        console.log(this.errors)
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000,
        })
      }
      else {
        const payload = {
          user: {
            email: this.email,
            // password: this.password
          }
        }
        this.$store.dispatch('resendConfirmationInstructions', payload)
          .then(result => {
            console.log(result)
            if (result.status === 200) {
              console.log(capitalize(result.data.first_name))
              this.$toast.success(this.$t('login.resendConfirmationInstructions', { email: result.data.email }), {
                position: 'bottom-center',
                duration: 3000,
              })
              this.email = null
              this.password = null
              this.$router.push({ path: '/' })
            }
            else {
              this.errors.push(result.data.error)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.error = true
              console.log(this.errors)
              this.$toast.error(this.errors[0], {
                position: 'bottom-center',
                duration: 3000,
              })
            }
          })
      }
    },
    login () {
      const checkForm = this.checkForm()
      if (checkForm) {
        this.disabled = true
        console.log(this.email)
        const payload = {
          // user: {
            email: this.email,
            password: this.password
          // }
        }
        this.$store.dispatch('users/sessions/logIn', payload)
          .then(response => {
            // console.log(response)
            if (response.status === 200) {
              const firstName = capitalize(response.data.first_name)
              console.log(firstName)
              this.$toast.success(this.$t('login.welcome', { firstName: firstName }), {
                position: 'bottom-center',
                duration: 3000,
              })
              this.email = null
              this.password = null
              this.$router.push({ path: '/' })
            }
            else {
              this.errors.push(response.data.error)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.error = true
              console.log(this.errors)
              this.$toast.error(this.errors[0], {
                position: 'bottom-center',
                duration: 3000,
              })
            }
          })
      }
      else {
        console.log(this.errors)
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000,
        })
      }
    },
  },
}
</script>
