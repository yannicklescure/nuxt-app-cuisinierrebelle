<template>
  <div>
    <SocialHead
      :title="'Recettes Sociales !'"
      :description="'Partagez vos recettes dès maintenant en toute simplicité'"
      :image="'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'"
    />
    <div class="container d-flex cr-vh100 justify-content-center align-items-center">
      <div class="d-flex py-3 justify-content-center align-items-center">
        <div class="d-flex flex-column w-md-50">
          <form>
            <div class="form-group mb-3">
              <label for="inputFirstName">{{ $t('signUp.firstName') }}</label>
              <input
                id="inputFirstName"
                v-model="firstName"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group mb-3">
              <label for="inputLastName">{{ $t('signUp.lastName') }}</label>
              <input
                id="inputLastName"
                v-model="lastName"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group mb-3">
              <label for="inputEmail">{{ $t('signUp.email') }}</label>
              <input
                id="inputEmail"
                v-model="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
              >
              <small id="emailHelp" class="form-text text-muted">{{ $t('signUp.disclaimer') }}</small>
            </div>
            <label for="inputPassword">{{ $t('signUp.password') }}</label>
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
                class="btn btn-dark mb-3 w-100"
                :disabled="disabled"
                @click.stop.prevent="signUp"
              >
                {{ $t('signUp.submit') }}
              </button>
            </div>
          </form>
          <div class="d-flex justify-content-center my-3">
            <NuxtLink to="/login">
              {{ $t('signUp.login') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signup',
  data () {
    return {
      disabled: true,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmation: null,
      errors: []
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
      if (!this.firstName) {
        this.errors.push(this.$t('signUp.errors.firstName'))
        return false
      }
      if (!this.lastName) {
        this.errors.push(this.$t('signUp.errors.lastName'))
        return false
      }
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
    signUp () {
      // console.log(this.email)
      const checkForm = this.checkForm()
      if (checkForm) {
        const payload = {
          user: {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmation
          }
        }
        this.$store.dispatch('users/authentication/signUp', payload)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.info(this.$t('signUp.success'), {
                position: 'bottom-center',
                duration: 3000
              })
              this.$router.push({ path: '/' })
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
          duration: 3000
        })
      }
    }
  }
}
</script>
