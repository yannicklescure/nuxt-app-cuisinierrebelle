<template>
  <div class="container">
    <div class="d-flex flex-column">
      <div class="py-3">
        <form v-on:input="allowPost" v-on:touchend="allowPost">
          <div class="h1 mb-3">{{ $t('users.settings.photo.title') }}</div>
          <div ref="photo" class="form-group mb-3">
            <div class="custom-file">
              <input v-on:change="processFile($event)" type="file" class="custom-file-input" id="photoFileLangHTML">
              <label class="custom-file-label" for="photoFileLangHTML" :data-browse="$t('users.settings.photo.chooseFile')">{{ $t('users.settings.photo.browse') }}</label>
            </div>
          </div>
          <div ref="preview"></div>
          <div class="d-flex justify-content-end">
            <button v-on:click.stop.prevent="postPicture" type="submit" class="btn btn-dark mb-3" :disabled="disabled">{{ $t('users.settings.photo.submit') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageCompression from 'browser-image-compression'

export default {
  name: 'UserPicture',
  middleware: ['authenticated', 'authorization'],
  data () {
    return {
      disabled: true,
      errors: [],
      photo: null,
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
    }),
  },
  methods: {
    async processFile (event) {
      // console.log(event)
      const imageFile = event.target.files[0];
      console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        this.photo = await new File([compressedFile], imageFile.name, {
          lastModifiedDate: imageFile.lastModified,
          type: imageFile.type
        })
        const reader = new FileReader()
        reader.onload = () => {
          this.$refs.preview.innerHTML = ''
          this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${ reader.result }" width="256" height="256" class="rounded img-fluid" alt="${ this.photo.name }"></div>`);
        }
        reader.readAsDataURL(this.photo)
      } catch (error) {
        console.log(error);
      }
      this.allowPost()
    },
    allowPost () {
      if (this.photo) this.disabled = false
      else this.disabled = true
    },
    checkForm () {
      this.errors = []
      if (!this.photo) {
        this.errors.push(this.$t('users.settings.photo.errors'))
        return false
      }
      return true
    },
    async postPicture () {
      const checkForm = this.checkForm()
      if (checkForm) {
        // console.log(this)
        this.disabled = true
        const payload = {
          image: this.photo,
        }
        console.log(payload)
        const response = await this.$store.dispatch('users/sessions/photo', payload)
        console.log(response)
        this.$toast.info(this.$t('users.settings.photo.success'), {
          position: 'bottom-center',
          duration: 3000,
        })
        this.$router.push({
          path: `/u/${ this.currentUser.slug }/settings`,
        })
      }
      else {
        console.log(this.errors)
        this.$toast.open({
            message: this.errors[0],
            type: 'error', // success, info, warning, error, default
            // all of other options may go here
            position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
            duration: 3000, // Visibility duration in milliseconds
            dismissible: true,
        })
      }
    },
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
    this.$refs.preview.innerHTML = ''
    this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${ this.currentUser.image.preview.url }" width="256" height="256" class="rounded img-fluid" alt="${ this.currentUser.slug }"></div>`);
  }
}
</script>
