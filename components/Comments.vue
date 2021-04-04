<template>
  <div
    id="comments"
    ref="comments"
    class="d-print-none mt-5"
  >
    <div class="h4 mb-3">
      {{ $tc('recipe.comments.counts', count) }}
    </div>
    <CommentNew
      :item="item"
      @commentNew="commentNew"
    />
    <div v-for="(comment, i) in comments" :key="`c${ comment.id }k${ i }`" class="d-flex flex-column">
      <Comment
        :item="comment"
        :type="'comment'"
        :last-comment-id="lastCommentId"
        @commentDestroyed="commentDestroyed"
        @commentReplyNew="commentReplyNew"
        @lastCommentMounted="lastCommentMounted"
      />
      <div
        v-if="comment.replies.length > 0"
        class="d-flex mouse-pointer"
        style="font-size: 90%"
        @click="showReplies(i)"
      >
        <span class="material-icons md-18">{{ show[i] ? 'arrow_drop_down' : 'arrow_drop_up' }}</span>
        {{ $tc('recipe.comments.viewReplies', comment.replies.length) }}
      </div>
      <transition name="fade">
        <div v-show="show[i]">
          <div v-for="(reply, j) in comment.replies" :key="`r${ reply.id }k${ j }`" class="d-flex align-items-start">
            <!-- <span class="material-icons md-18 mt-3">subdirectory_arrow_right</span> -->
            <Comment
              :item="reply"
              :type="'reply'"
              class="border-left pl-3 flex-grow-1"
              @commentDestroyed="commentDestroyed"
              @commentReplyNew="commentReplyNew"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      show: []
    }
  },
  computed: {
    count () {
      if (this.item.comments) {
        const counts = this.item.comments.map(comment => comment.replies.length)
        let sum = counts.length
        counts.map((res) => {
          sum += res
          return true
        })
        return sum
      } else {
        return 0
      }
    },
    comments () {
      return this.item.comments
    },
    lastCommentId () {
      return this.count > 0 ? this.item.comments[this.item.comments.length - 1].id : 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initShow()
      this.$emit('commentsReady', true)
    })
  },
  methods: {
    lastCommentMounted (value) {
      this.$emit('lastCommentMounted', value)
    },
    commentNew (payload) {
      this.$emit('refresh', true)
    },
    commentReplyNew (payload) {
      this.$emit('refresh', true)
    },
    commentDestroyed (payload) {
      this.$emit('refresh', true)
    },
    showReplies (index) {
      this.$set(this.show, index, !this.show[index])
    },
    initShow () {
      this.show = [...new Array(this.item.comments.length)].map(() => true)
      // this.show = [...new Array(this.item.comments.length)].map(() => false)
    }
  }
}
</script>
