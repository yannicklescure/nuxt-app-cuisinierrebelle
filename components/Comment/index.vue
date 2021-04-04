<template>
  <div :id="type + item.id" :ref="type + item.id" :class="['pt-3 pb-2', { 'ml-2': type == 'reply' }]">
    <div class="d-flex align-items-center">
      <img
        :src="item.user.image.thumb.url"
        :alt="item.user.name"
        width="24"
        height="24"
        class="rounded-circle"
      >
      <NuxtLink
        :to="`/u/${ item.user.slug }`"
        class="mx-2 text-capitalize text-body"
        style="font-size: 90%"
      >
        {{ item.user.name }}
      </NuxtLink>
      <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
    </div>
    <div v-if="edit">
      <CommentForm
        :item="item"
        :action-attr="editActionAttr()"
        :text="item.content"
        @commentEditResponse="commentEditResponse"
        @commentDrop="commentDrop"
        @commentNew="commentNew"
      />
    </div>
    <div v-else class="pt-2">
      <vue-markdown-plus :source="item.content" class="text-break" />
    </div>
    <CommentButtons
      :item="item"
      :type="type"
      @commentEdit="commentEdit"
      @commentReply="commentReply"
      @commentDestroyed="commentDestroyed"
    />
    <div v-if="reply">
      <CommentForm
        :item="item"
        :action-attr="'replyNew'"
        :text="null"
        @commentReplyNew="commentReplyNew"
        @commentDrop="commentDrop"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdownPlus from 'vue-markdown-plus'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  components: {
    VueMarkdownPlus
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    lastCommentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      edit: false,
      reply: false
    }
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight'
    })
  },
  mounted () {
    if (this.$route.hash && this.item.id === parseInt(this.$route.hash.match(/(?:#comment|#reply?)(.+)/)[1])) {
      this.scroll2Anchor()
    }
  },
  methods: {
    commentNew (payload) {
      this.$emit('commentNew', payload)
    },
    commentDestroyed (value) {
      this.$emit('commentDestroyed', value)
    },
    commentEdit (value) {
      this.edit = value
      this.$emit('commentEdit', true)
    },
    commentReply (value) {
      // console.log('reply')
      this.reply = value
      this.$emit('commentReply', true)
    },
    editActionAttr () {
      if (this.item.commentId) {
        return 'replyEdit'
      } else {
        return 'commentEdit'
      }
    },
    commentDrop () {
      this.edit = false
      this.reply = false
      return false
    },
    commentReplyNew (payload) {
      this.$emit('commentReplyNew', payload)
      this.reply = false
      // this.item.content = value.data.content
    },
    commentEditResponse (payload) {
      this.edit = false
    },
    timeAgo (time) {
      const between = Math.trunc((new Date().getTime() - time) / 1000)
      if (between < 3600) {
        return this.$tc('comments.minutes', Math.trunc(between / 60))
      } else if (between < 86400) {
        return this.$tc('comments.hours', Math.trunc(between / 3600))
      } else if (between < 2592000) {
        return this.$tc('comments.days', Math.trunc(between / 86400))
      } else if (between < 31104000) {
        return this.$tc('comments.months', Math.trunc(between / 2592000))
      } else {
        return this.$tc('comments.years', Math.trunc(between / 311004000))
      }
    },
    scroll2Anchor () {
      // const currentPage = this.$route.fullpath
      const target = this.$route.hash
      if (target) {
        const element = this.$refs[target.match(/(?:#)(.+)/)[1]]
        if (element) {
          const scrollOptions = {
            top: element.offsetTop - this.navbarHeight,
            left: 0,
            behavior: 'smooth'
          }
          window.scrollTo(scrollOptions)
          window.history.pushState('object or string', 'Title', this.$route.path)
        }
      }
    }
  }
}
</script>
