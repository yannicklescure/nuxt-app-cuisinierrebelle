<template>
  <div class="container" :key="componentKey">
    <div class="py-3">
      <form v-on:input="allowPost" v-on:touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputPageTitle">{{ $t('page.new.title') }}</label>
          <input v-model="title" type="text" class="form-control" id="inputPageTitle">
        </div>
        <div class="form-group mb-3">
          <label for="inputPageContent">{{ $t('page.new.content') }}</label>
          <textarea v-model="content" :maxlength="max" class="form-control" id="inputPageContent" rows="10"></textarea>
          <small id="contentHelpBlock" class="form-text text-muted">
            {{ $tc('page.new.contentHelp', (max - content.length)) }}
          </small>
        </div>
        <label for="inputPageLocale">{{ $t('page.new.locale') }}</label>
        <div class="input-group mb-3">
          <select v-model="locale" class="custom-select" id="inputPageLocale" :aria-label="$t('page.edit.select')">
            <option selected>{{ $t('page.edit.select') }}</option>
            <option value="fr">Fr</option>
            <option value="en">En</option>
            <option value="es">Es</option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
          <b-button v-if="posting" variant="dark mb-3" disabled>
            <b-spinner small></b-spinner>
            <span class="sr-only">Loading...</span>
          </b-button>
          <button
            v-else
            @click.stop.prevent="postPageEdit"
            type="submit"
            class="btn btn-dark mb-3"
            :disabled="disabled"
          >{{ $t('page.new.submit') }}</button>
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
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      page: 'pages/filter',
      // currentUser: 'users/sessions/current',
      // isMobile: 'isMobile',
    }),
    item () {
      return this.page(this.$route.params.slug)
    }
  },
  methods: {
    setData () {
      if (this.item) {
        console.log(this.item)
        // this.componentKey += 1
        this.id = this.item.id
        this.locale = this.item.locale
        this.title = this.item.title
        this.content = this.item.content
      }
    },
    processFile (event) {
      console.log(event)
      this.photo = event.target.files[0]
      console.log(this.photo)
      console.log(this.$refs.photo)
      // console.log(URL.createObjectURL(this.photo))
      // this.$refs.photo.src = URL.createObjectURL(this.photo)
      const reader = new FileReader()
      reader.onload = () => {
        // console.log(reader.result)
        this.$refs.preview.innerHTML = ''
        this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${reader.result}" class="rounded img-fluid" alt="${this.photo.name}"></div>`);
        // this.$refs.photo.src = reader.result
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
        // console.log(this)
        this.disabled = true
        this.posting = true
        const payload = {
          id: this.id,
          locale: this.locale,
          title: this.title,
          content: this.content,
        }
        console.log(payload)
        await this.$store.dispatch('pages/edit', payload)
          .then(response => {
            this.posting = false
            console.log(response)
            // if (response.status === 200) {
              this.$router.push({
                path: `/p/${ this.item.slug }`,
                // params: {
                //   id: response.data.slug
                // }
              })
            // }
          })
      }
      else {
        console.log(this.errors)
        this.posting = false
        this.$toast.error(this.errors[0], {
            position: 'bottom-center',
            duration: 3000, // Visibility duration in milliseconds
        })
      }
    },
  },
  mounted () {
    this.setData()
  }
}
</script>
