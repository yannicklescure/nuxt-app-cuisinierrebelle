<template>
  <div ref="comments" id="comments" class="d-print-none mt-5">
    <div class="h4 mb-3">{{ $tc('recipe.comments.counts', count) }}</div>
    <CommentNew
      :item="item"
      v-on:commentNew="commentNew"
    />
    <div v-for="comment, i in comments" class="d-flex flex-column">
      <Comment
        :item="comment"
        :type="'comment'"
        :lastCommentId="lastCommentId"
        :key="'c' + i"
        v-on:commentDestroyed="commentDestroyed"
        v-on:commentReplyNew="commentReplyNew"
        v-on:lastCommentMounted="lastCommentMounted"
      />
      <div
        v-if="comment.replies.length > 0"
        v-on:click="showReplies(i)"
        class="d-flex mouse-pointer"
        style="font-size: 90%"
      >
        <span class="material-icons md-18">{{ show[i] ? 'arrow_drop_down' : 'arrow_drop_up' }}</span>
        {{ $tc('recipe.comments.viewReplies', comment.replies.length) }}
      </div>
      <transition name="fade">
        <div v-show="show[i]">
          <div v-for="reply, j in comment.replies" class="d-flex align-items-start">
            <!-- <span class="material-icons md-18 mt-3">subdirectory_arrow_right</span> -->
            <Comment
              :item="reply"
              :type="'reply'"
              :key="'c' + i + 'r' + j"
              class="border-left pl-3 flex-grow-1"
              v-on:commentDestroyed="commentDestroyed"
              v-on:commentReplyNew="commentReplyNew"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import CommentForm from './New.vue'
// import Comment from './Show.vue'
// const CommentForm = () => import('./New.vue')
// const Comment = () => import('./Show.vue')

export default {
  name: 'Comments',
  data () {
    return {
      componentKey: 0,
      show: [],
    }
  },
  // components: {
  //   CommentForm,
  //   Comment,
  // },
  // props: ['item'],
  computed: {
    ...mapGetters({
      // 'count',
      recipe: 'recipes/recipe',
    }),
    item () {
      return this.recipe(this.$route.params.slug)
    },
    comments () {
      return this.item.comments.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
    },
    count () {
      if (this.comments) {
        const counts = this.comments.map(comment => comment.replies.length)
        let sum = counts.length
        counts.map(res => sum += res)
        return sum
      }
      else return 0
    },
    lastCommentId () {
      return this.count > 0 ? this.comments[this.comments.length-1].id : 0
    },
  },
  methods: {
    lastCommentMounted (value) {
      this.$emit('lastCommentMounted', value)
    },
    commentNew (payload) {
      console.log(payload)
      // this.item.comments.push(payload.data)
      // this.componentKey += 1
    },
    commentReplyNew (payload) {
      console.log(this.item)
      console.log(payload)
      // const comment = this.item.comments.filter(c => c.id === payload.data.id)[0]
      // const position = this.item.comments.indexOf(comment)
      // this.item.comments[position] = payload.data
      // this.componentKey += 1
    },
    commentDestroyed (payload) {
      console.log(this.item)
      console.log(payload)
      // this.componentKey += 1

      // if (payload.type === 'comment') {
      //   console.log(`destroy comment ${ payload.comment_id }`)
      //   const comment = this.item.comments.filter(c => c.id === payload.comment_id)[0]
      //   const pos = this.item.comments.indexOf(comment)
      //   this.item.comments[pos].splice(pos, 1)
      // }

      // if (payload.type === 'reply') {
      //   // const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
      //   // console.log(recipe)
      //   // const position = state.data.recipes.indexOf(recipe)
      //   // console.log(position)
      //   console.log(`destroy reply ${ payload.id }`)
      //   const comment = this.item.comments.filter(c => c.id === payload.comment_id)[0]
      //   const pos = this.item.comments.indexOf(comment)
      //   const reply = this.item.comments[pos].replies.filter(r => r.id === payload.id)[0]
      //   const p = this.item.comments[pos].replies.indexOf(reply)
      //   this.item.comments[pos].replies.splice(p, 1)
      // }
    },
    showReplies (index) {
      console.log(`comment ${index} ${this.show[index]}`)
      // this.show[index] = !this.show[index]
      // https://stackoverflow.com/questions/41580617/vuejs-v-if-arrayindex-is-not-working
      this.$set(this.show, index, !this.show[index])
    },
    initShow () {
      // this.show = Array(this.item.comments.length).fill(false)
      this.show = [...new Array(this.item.comments.length)].map(() => true)
      // this.show = [...new Array(this.item.comments.length)].map(() => false)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initShow()
      this.$emit('commentsReady', true)
    })
  }
}
</script>
