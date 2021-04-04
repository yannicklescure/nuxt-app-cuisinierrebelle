<template>
  <div :key="componentKey" class="container">
    <div v-if="show" class="py-3">
      <form @input="allowPost" @touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputRecipeTitle">{{ $t('recipe.new.title') }}</label>
          <input id="inputRecipeTitle" v-model="title" type="text" class="form-control">
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeSubtitle">{{ $t('recipe.new.subtitle') }}</label>
          <input id="inputRecipeSubtitle" v-model="subtitle" type="text" class="form-control">
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipedescription">{{ $t('recipe.new.description') }}</label>
          <textarea id="inputRecipedescription" v-model="description" :maxlength="max" class="form-control" rows="3" />
          <small id="descriptionHelpBlock" class="form-text text-muted">
            {{ $tc('recipe.new.descriptionHelp', (max - description.length)) }}
          </small>
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeDirection">{{ $t('recipe.new.direction') }}</label>
          <textarea id="inputRecipeDirection" v-model="direction" class="form-control" rows="10" />
        </div>
        <div class="mb-2">
          {{ $t('recipe.new.photo') }}
        </div>
        <div ref="photo" class="form-group mb-3">
          <div class="custom-file">
            <input id="photoFileLangHTML" type="file" class="custom-file-input" @change="processFile($event)">
            <label class="custom-file-label" for="photoFileLangHTML" :data-browse="$t('recipe.new.chooseFile')">{{ $t('recipe.new.browse') }}</label>
          </div>
        </div>
        <div v-if="item" ref="preview">
          <div class="mb-3">
            <img :src="item.recipe.photo.full.url" class="rounded img-fluid" :alt="item.recipe.title">
          </div>
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeVideo">{{ $t('recipe.new.video') }}</label>
          <input id="inputRecipeVideo" v-model="video" type="url" class="form-control">
        </div>
        <label for="inputRecipeTags">{{ $t('recipe.new.tags') }}</label>
        <div class="form-group mb-3">
          <textarea id="inputRecipeTags" v-model="tagList" class="form-control" rows="3" />
          <small id="tagsHelpBlock" class="form-text text-muted">
            {{ $t('recipe.new.tagsHelp') }}
          </small>
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-link mb-3" @click.stop.prevent="deleteRecipe">
            {{ $t('recipe.delete.submit') }}
          </button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeEdit',
  middleware: ['authenticated', 'authorization'],
  // props: ['item'],
  data () {
    return {
      componentKey: 0,
      show: false,
      // navbarHeight: 0,
      id: 0,
      title: null,
      subtitle: null,
      video: null,
      direction: '',
      description: '',
      // image: null,
      photo: null,
      tagList: null,
      // disabled: true,
      disabled: false,
      posting: false,
      max: 280,
      errors: []
    }
  },
  async fetch () {
    await this.setData()
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current',
      recipe: 'recipes/recipe'
    }),
    item () {
      return this.recipe(this.$route.params.slug)
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    setData () {
      if (this.item) {
        this.componentKey += 1
        this.id = this.item.recipe.id
        this.title = this.item.recipe.title
        this.subtitle = this.item.recipe.subtitle
        this.video = this.item.recipe.video
        this.direction = this.item.recipe.direction
        this.description = this.item.recipe.description
        this.photo = this.item.recipe.photo
        this.tagList = this.item.recipe.tagList.join(', ')
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
          id: this.id,
          title: this.title,
          subtitle: this.subtitle,
          video: this.video,
          direction: this.direction,
          description: this.description,
          photo: this.photo,
          tagList: this.tagList
        }
        this.$store.dispatch('recipes/edit', payload)
          .then((response) => {
            this.posting = false
            if (response.status === 200) {
              this.$router.push({
                path: `/r/${this.$route.params.slug}`,
                params: {
                  slug: response.data.recipe.slug
                }
              })
            }
          })
      } else {
        this.posting = false
        this.$toast.open({
          message: this.errors[0],
          type: 'error', // success, info, warning, error, default
          // all of other options may go here
          position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
          duration: 3000, // Visibility duration in milliseconds
          dismissible: true
        })
      }
    },
    deleteRecipe () {
      const message = this.$t('recipe.delete.are_you_sure')
      const options = {
        okText: this.$t('recipe.delete.okText'),
        cancelText: this.$t('recipe.delete.cancelText'),
        backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      }
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          // console.log('Clicked on proceed')
          const payload = {
            id: this.id
          }
          this.$store.dispatch('recipes/delete', payload)
            .then((response) => {
              this.$router.push({
                path: '/'
              })
            })
        })
        .catch(() => {
          // console.log('Clicked on cancel')
        })
    }
  }
}
</script>
