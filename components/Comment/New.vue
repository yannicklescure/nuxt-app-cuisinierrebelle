<template>
  <div>
    <div v-if="isAuthenticated">
      <CommentForm
        :item="item"
        :actionAttr="'commentNew'"
        :text="null"
        v-on:commentNew="commentNew"
      />
    </div>
    <div v-else>
      <div class="input-group my-3">
        <textarea id="new-user-registration" v-on:click="login" class="form-control" :placeholder="$t('recipe.comments.addPublicComment')" aria-label="With textarea"></textarea>
      </div>
      <div class="input-group my-3">
        <button type="button" class="btn btn-light" :disabled="disabled">{{ $t('commentForm.comment') }}</button>
        <button class="btn btn-light comment-photo-btn cr-p-6 ml-3" :disabled="disabled">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import CommentForm from './Form.vue'
// const CommentForm = () => import('./Form.vue')

export default {
  name: 'CommentNew',
  props: ['item'],
  data() {
    return {
      disabled: true,
      content: null,
    }
  },
  // components: {
  //   CommentForm,
  // },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current',
    }),
  },
  methods: {
    commentNew (payload) {
      this.$emit('commentNew', payload)
    },
    login () {
      this.$router.push({ path: '/login' })
    },
  },
}
</script>
