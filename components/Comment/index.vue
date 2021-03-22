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
      >{{ item.user.name }}</NuxtLink>
      <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
    </div>
    <div v-if="edit">
      <CommentForm
        :item="item"
        :actionAttr="editActionAttr()"
        :text="item.content"
        v-on:commentEditResponse="commentEditResponse"
        v-on:commentDrop="commentDrop"
        v-on:commentNew="commentNew"
      />
    </div>
    <div v-else class="pt-2">
      <vue-markdown-plus :source="item.content" class="text-break" />
    </div>
    <CommentButtons
      :item="item"
      :type="type"
      v-on:commentEdit="commentEdit"
      v-on:commentReply="commentReply"
      v-on:commentDestroyed="commentDestroyed"
    />
    <div v-if="reply">
      <CommentForm
        :item="item"
        :actionAttr="'replyNew'"
        :text="null"
        v-on:commentReplyNew="commentReplyNew"
        v-on:commentDrop="commentDrop"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdownPlus from 'vue-markdown-plus'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  props: ['item', 'type', 'lastCommentId'],
  data() {
    return {
      edit: false,
      reply: false,
    }
  },
  components: {
    // CommentButtons,
    // CommentForm,
    // CommentLike,
    VueMarkdownPlus,
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      isMobile: 'isMobile',
    }),
    isMobile () {
      return isMobile
    },
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
      if (this.item.commentId) return 'replyEdit'
      else return 'commentEdit'
    },
    commentDrop () {
      this.edit = false
      this.reply = false
      return false
    },
    commentReplyNew (payload) {
      console.log(payload)
      this.$emit('commentReplyNew', payload)
      this.reply = false
      // this.item.content = value.data.content
    },
    commentEditResponse (payload) {
      this.edit = false
      if (this.item.commentId) {
        console.log(payload)
        console.log(this.item)
        // reply id : this.item.id
        // reply content : this.item.content
        // reply comment : this.item.commentId
        // const reply = payload.data.replies.filter(r => r.id === this.item.id)[0]
        // this.item.content = reply.content
      }
      else {
        // this.item.content = payload.data.content
      }
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
      if(target) {
        console.log(this.$refs)
        console.log(this.$route)
        console.log(target)
        console.log(target.match(/(?:#)(.+)/)[1])
        let element = this.$refs[target.match(/(?:#)(.+)/)[1]]
        // let element = this.$el.querySelector(target)
        // let element = this.$el
        // if (target.match(/(?:#)(.+)/)[1] === 'comments') element = this.$refs.comments
        console.log(element)
        if (element) {
          const scrollOptions = {
            top: element.offsetTop - this.navbarHeight,
            left: 0,
            behavior: 'smooth'
          };
          window.scrollTo(scrollOptions)
          window.history.pushState("object or string", "Title", this.$route.path)
        }
      }
    },
  },
  mounted() {
    console.log(`${this.type} ${this.item.id}`)
    if (this.$route.hash && this.item.id === parseInt(this.$route.hash.match(/(?:#comment|#reply?)(.+)/)[1])) this.scroll2Anchor()
    // if (this.type === 'comment' && this.item.id === this.lastCommentId) {
    //   console.log('all comments mounted')
    //   console.log(this.$route)
    //   this.$emit('lastCommentMounted', true)
    // }
  }
}
</script>
