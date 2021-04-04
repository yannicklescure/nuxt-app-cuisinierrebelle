<template>
  <div>
    <div v-if="isAuthenticated">
      <CommentForm
        :item="item"
        :action-attr="'commentNew'"
        :text="null"
        @commentNew="commentNew"
      />
    </div>
    <div v-else>
      <div class="input-group my-3">
        <textarea
          id="new-user-registration"
          class="form-control"
          :placeholder="$t('recipe.comments.addPublicComment')"
          aria-label="With textarea"
          @click="login"
        />
      </div>
      <div class="input-group my-3">
        <button type="button" class="btn btn-light" :disabled="disabled">
          {{ $t('commentForm.comment') }}
        </button>
        <button class="btn btn-light comment-photo-btn cr-p-6 ml-3" :disabled="disabled">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentNew',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      disabled: true,
      content: null
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current'
    })
  },
  methods: {
    commentNew (payload) {
      this.$emit('commentNew', payload)
    },
    login () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
