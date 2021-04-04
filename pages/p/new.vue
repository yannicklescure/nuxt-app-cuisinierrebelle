<template>
  <div :key="componentKey" class="container">
    <div class="py-3">
      <form @input="allowPost" @touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputPageTitle">
            {{ $t('page.new.title') }}
          </label>
          <input id="inputPageTitle" v-model="title" class="form-control" type="text">
        </div>
        <div class="form-group mb-3">
          <label for="inputPageContent">{{ $t('page.new.content') }}</label>
          <textarea id="inputPageContent" v-model="content" class="form-control" :maxlength="max" rows="10" />
          <small id="contentHelpBlock" class="form-text text-muted">
            {{ $tc('page.new.contentHelp', (max - content.length)) }}
          </small>
        </div>
        <label for="inputPageLocale">{{ $t('page.new.locale') }}</label>
        <div class="input-group mb-3">
          <select id="inputPageLocale" v-model="locale" class="custom-select" :aria-label="$t('page.edit.select')">
            <option selected>
              {{ $t('page.edit.select') }}
            </option>
            <option value="fr">
              Fr
            </option>
            <option value="en">
              En
            </option>
            <option value="es">
              Es
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
          <b-button v-if="posting" variant="dark mb-3" disabled>
            <b-spinner small />
            <span class="sr-only">Loading...</span>
          </b-button>
          <button
            v-else
            type="submit"
            class="btn btn-dark mb-3"
            :disabled="disabled"
            @click.stop.prevent="postNewPage"
          >
            {{ $t('page.new.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageNew',
  middleware: ['authenticated', 'admin'],
  data () {
    return {
      componentKey: 0,
      id: 0,
      title: '',
      content: '',
      locale: 'fr',
      disabled: false,
      posting: false,
      max: 50000,
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current'
    })
  },
  methods: {
    allowPost () {
      // if (this.title && this.direction && this.photo) {
      //   this.disabled = false
      // }
      // else {
      //   this.disabled = true
      // }
    },
    validateYoutubeVideoUrl (url) {
      const re = /(^$|^.*@.*\..*$)|youtu.?be/
      return re.test(String(url).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.title) {
        this.errors.push(this.$t('page.new.errors.title'))
        return false
      }
      if (!this.content) {
        this.errors.push(this.$t('page.new.errors.content'))
        return false
      }
      return true
    },
    async postNewPage () {
      const checkForm = this.checkForm()
      if (checkForm) {
        this.disabled = true
        this.posting = true
        const payload = {
          id: this.id,
          slug: this.$route.params.id,
          title: this.title,
          content: this.content,
          locale: this.locale
        }
        await this.$store.dispatch('pages/new', payload)
          .then((response) => {
            this.posting = false
            this.$router.push({
              path: `/p/${response.slug}`
            })
          })
      } else {
        this.posting = false
        this.$toast.error(this.errors[0], {
          position: 'bottom-center',
          duration: 3000 // Visibility duration in milliseconds
        })
      }
    }
  }
}
</script>
