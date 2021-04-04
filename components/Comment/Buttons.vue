<template>
  <div>
    <div v-if="isAuthenticated" class="mt-2 d-flex align-items-center">
      <BtnCommentLike :item="item" :type="type" />
      <div
        v-if="item.user.id == currentUser.id"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comments.edit')"
        @click="commentEdit"
      >
        <span class="material-icons md-16">edit</span>
      </div>
      <div
        v-if="item.user.id == currentUser.id"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comments.destroy')"
        @click="isComment2Destroy"
      >
        <span class="material-icons md-16">delete</span>
      </div>
      <div
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comments.reply')"
        @click="commentReply"
      >
        {{ $t('comments.reply') }}
        <!-- <span class="material-icons md-16">reply</span> -->
      </div>
    </div>
    <div v-else class="mt-2 d-flex align-items-center">
      <div
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comments.like')"
        @click="login"
      >
        <span class="material-icons md-16">thumb_up</span>
      </div>
      <div
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comments.reply')"
        @click="login"
      >
        {{ $t('comments.reply') }}
        <!-- <span class="material-icons md-16">reply</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentButtons',
  props: {
    item: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/current'
    })
  },
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    },
    commentEdit () {
      this.$emit('commentEdit', true)
    },
    commentReply () {
      this.$emit('commentReply', true)
    },
    isComment2Destroy () {
      const message = this.$t('comments.are_you_sure')

      const options = {
        okText: this.$t('comments.destroy'),
        cancelText: this.$t('comments.cancel'),
        backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      }

      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          // console.log('Clicked on proceed')
          this.commentDestroy()
        })
        .catch(() => {
          // console.log('Clicked on cancel')
        })
    },
    commentDestroy () {
      let payload = {}
      if (this.type === 'comment') {
        payload = {
          comment_id: this.item.id,
          recipe_id: this.item.recipe.id,
          type: this.type
        }
      }
      if (this.type === 'reply') {
        payload = {
          comment_id: this.item.commentId,
          recipe_id: this.item.recipeId,
          id: this.item.id,
          type: this.type
        }
      }
      this.$store
        .dispatch(`recipes/${this.type}Delete`, payload)
        .then((response) => {
          if (response.status === 204) {
            this.$emit('commentDestroyed', payload)
          }
        })
    }
  }
}
</script>
