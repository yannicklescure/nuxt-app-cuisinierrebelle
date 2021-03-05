<template>
  <div :ref="`share${item.recipe.id}`">
    <div v-if="isMobile" @click="shareItemMobile" class="d-flex">
      <span :class="['material-icons btn-share', isMobile ? 'md-32' : 'md-18']">share</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { isMobile } from 'mobile-device-detect'
// import SocialSharingModal from './SocialSharingModal.vue'
// const SocialSharingModal = () => import('./SocialSharingModal.vue')

export default {
  name: 'BtnShare',
  props: ['item'],
  // components: {
  //   SocialSharingModal,
  // },
  data () {
    return {
      // views: 0,
    }
  },
  computed: {
    ...mapGetters(['isMobile']),
  },
  methods: {
    async shareItemMobile () {
      const shareData = {
        // title: 'MDN',
        // text: 'Learn web development on MDN!',
        // url: 'https://developer.mozilla.org',
        url: `${ process.env.baseUrl }/r/${this.item.recipe.slug}`
      }
      // Must be triggered some kind of "user activation"
      try {
        await navigator.share(shareData)
        // resultPara.textContent = 'MDN shared successfully'
        console.log('MDN shared successfully')
      } catch(err) {
        // resultPara.textContent = 'Error: ' + err
        console.log('Error: ' + err)
      }
      console.log(shareData)
    },
  },
  beforeMount () {
    // this.recipeLog()
  },
  updated () {
    // this.recipeLog()
  }
}
</script>
