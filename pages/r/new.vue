<template>
  <div class="container">
    <div class="py-3">
      <form @input="allowPost" @touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputRecipeTitle">{{ $t('recipe.new.title') }}</label>
          <input
            id="inputRecipeTitle"
            v-model="title"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeSubtitle">{{ $t('recipe.new.subtitle') }}</label>
          <input
            id="inputRecipeSubtitle"
            v-model="subtitle"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipedescription">{{ $t('recipe.new.description') }}</label>
          <textarea
            id="inputRecipedescription"
            v-model="description"
            :maxlength="max"
            class="form-control"
            rows="3"
          />
          <small id="descriptionHelpBlock" class="form-text text-muted">
            {{ $tc('recipe.new.descriptionHelp', (max - description.length)) }}
          </small>
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeDirection">{{ $t('recipe.new.direction') }}</label>
          <textarea
            id="inputRecipeDirection"
            v-model="direction"
            class="form-control"
            rows="10"
          />
        </div>
        <div class="mb-2">
          {{ $t('recipe.new.photo') }}
        </div>
        <div ref="photo" class="form-group mb-3">
          <div class="custom-file">
            <input
              id="photoFileLangHTML"
              type="file"
              class="custom-file-input"
              @change="processFile($event)"
            >
            <label class="custom-file-label" for="photoFileLangHTML" :data-browse="$t('recipe.new.chooseFile')">{{ $t('recipe.new.browse') }}</label>
          </div>
        </div>
        <div ref="preview" />
        <div class="form-group mb-3">
          <label for="inputRecipeVideo">{{ $t('recipe.new.video') }}</label>
          <input
            id="inputRecipeVideo"
            v-model="video"
            type="url"
            class="form-control"
          >
        </div>
        <label for="inputRecipeTags">{{ $t('recipe.new.tags') }}</label>
        <div class="form-group mb-3">
          <textarea
            id="inputRecipeTags"
            v-model="tagList"
            class="form-control"
            rows="3"
          />
          <small id="tagsHelpBlock" class="form-text text-muted">
            {{ $t('recipe.new.tagsHelp') }}
          </small>
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
            @click.stop.prevent="postRecipe"
          >
            {{ $t('recipe.new.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression'

export default {
  name: 'RecipeNew',
  data () {
    return {
      title: null,
      subtitle: null,
      video: null,
      direction: '',
      description: '',
      photo: null,
      tagList: null,
      disabled: true,
      posting: false,
      max: 280,
      errors: []
    }
  },
  methods: {
    async processFile (event) {
      const imageFile = event.target.files[0]

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      }
      try {
        const compressedFile = await imageCompression(imageFile, options)

        this.photo = await new File([compressedFile], imageFile.name, {
          lastModifiedDate: imageFile.lastModified,
          type: imageFile.type
        })
        const reader = new FileReader()
        reader.onload = () => {
          this.$refs.preview.innerHTML = ''
          this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${reader.result}" width="1920" height="1080" class="rounded img-fluid" alt="${this.photo.name}"></div>`)
        }
        reader.readAsDataURL(this.photo)
      } catch (error) {
        // console.log(error)
      }
      this.allowPost()
    },
    allowPost () {
      if (this.title && this.direction && this.photo) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    validateYoutubeVideoUrl (url) {
      const re = /(^$|^.*@.*\..*$)|youtu.?be/
      return re.test(String(url).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.title) {
        this.errors.push(this.$t('recipe.new.errors.title'))
        return false
      }
      if (!this.direction) {
        this.errors.push(this.$t('recipe.new.errors.direction'))
        return false
      }
      if (!this.photo) {
        this.errors.push(this.$t('recipe.new.errors.photo'))
        return false
      }
      if (this.video && !this.validateYoutubeVideoUrl(this.video)) {
        this.errors.push(this.$t('recipe.new.errors.youtubeVideoUrl'))
        return false
      }
      return true
    },
    postRecipe () {
      const checkForm = this.checkForm()
      if (checkForm) {
        this.disabled = true
        this.posting = true
        const payload = {
          title: this.title,
          subtitle: this.subtitle,
          video: this.video,
          direction: this.direction,
          description: this.description,
          photo: this.photo,
          tagList: this.tagList
        }
        this.$store.dispatch('recipes/new', payload)
          .then((response) => {
            this.posting = false
            if (response.status === 200) {
              this.$router.push({
                path: `/r/${response.data.recipe.slug}`
              })
            }
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
