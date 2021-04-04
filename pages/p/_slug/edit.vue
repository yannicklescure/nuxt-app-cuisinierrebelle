<template>
  <div :key="componentKey" class="container">
    <div class="py-3">
      <form @input="allowPost" @touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputPageTitle">
            {{ $t('page.new.title') }}
          </label>
          <input id="inputPageTitle" v-model="title" type="text" class="form-control">
        </div>
        <div class="form-group mb-3">
          <label for="inputPageContent">{{ $t('page.new.content') }}</label>
          <textarea id="inputPageContent" v-model="content" :maxlength="max" class="form-control" rows="10" />
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
            @click.stop.prevent="postPageEdit"
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
  name: 'PageEdit',
  middleware: ['authenticated', 'admin'],
  // props: ['item'],
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      id: 0,
      title: '',
      content: '',
      locale: 'fr',
      posting: false,
      disabled: false,
      max: 50000,
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      page: 'pages/filter'
    }),
    item () {
      return this.page(this.$route.params.slug)
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.item) {
        this.id = this.item.id
        this.locale = this.item.locale
        this.title = this.item.title
        this.content = this.item.content
      }
    },
    processFile (event) {
      this.photo = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.$refs.preview.innerHTML = ''
        this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${reader.result}" class="rounded img-fluid" alt="${this.photo.name}"></div>`)
      }
      reader.readAsDataURL(this.photo)
      this.allowPost()
    },
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
    async postPageEdit () {
      const checkForm = this.checkForm()
      if (checkForm) {
        this.disabled = true
        this.posting = true
        const payload = {
          id: this.id,
          locale: this.locale,
          title: this.title,
          content: this.content
        }
        await this.$store.dispatch('pages/edit', payload)
          .then((response) => {
            this.posting = false
            this.$router.push({
              path: `/p/${this.item.slug}`
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
