<template>
  <div :class="['card-footer border-0 bg-white p-0']">
    <div class="d-flex justify-content-between align-items-start my-2">
      <div :class="['d-flex justify-content-between', isMobile ? 'align-items-start' : 'align-items-center']">
        <BtnVisit :item="item" />
        <BtnComment :item="item" />
        <BtnShare :item="item" />
      </div>
      <div :class="['d-flex', isMobile ? 'align-items-start' : 'align-items-center']">
        <BtnLike :item="item" />
        <BtnBookmark :item="item" />
      </div>
    </div>
    <div :class="['d-flex flex-column', isMobile ? 'p-0' : 'p-0']">
      <NuxtLink
        :to="`/r/${ item.recipe.slug }/`"
        class="card-link text-body text-uppercase"
      >
        {{ item.recipe.title }}
      </NuxtLink>
      <div
        class="card-text font-weight-lighter"
        style="font-size: 90%"
      >
        {{ item.recipe.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// const Bookmark = () => import('../buttons/Bookmark.vue')
// const Comment = () => import('../buttons/Comment.vue')
// const Like = () => import('../buttons/Like.vue')
// const Share = () => import('../buttons/Share.vue')
// const Visit = () => import('../buttons/Visit.vue')

export default {
  name: 'CardFooter',
  props: ['item'],
  // components: {
  //   Bookmark,
  //   Comment,
  //   Like,
  //   Share,
  //   Visit,
  // },
  computed: {
    ...mapGetters([
      'isMobile',
    ]),
  },
  // methods: {
  //   heartFillBig () {
  //     console.log('liked')
  //     this.$refs.heartFillBig.innerHTML = '<i class="material-icons md-96 text-danger">favorite</i>'
  //     setTimeout(() => {
  //       this.$refs.heartFillBig.innerHTML = ''
  //     }, 1000);
  //   },
  //   bookmarkFillBig () {
  //     console.log('liked')
  //     this.$refs.bookmarkFillBig.innerHTML = '<i class="material-icons md-96 text-body">bookmark</i>'
  //     setTimeout(() => {
  //       this.$refs.bookmarkFillBig.innerHTML = ''
  //     }, 1000);
  //   },
  // }
}
</script>
