<template>
  <div :ref="`share${item.recipe.id}`">
    <div v-if="$device.isMobile" @click="shareItemMobile" class="d-flex">
      <span :class="['material-icons btn-share', $device.isMobile ? 'md-32' : 'md-18']">share</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BtnShare',
  props: ['item'],
  data () {
    return {
    }
  },
  methods: {
    async shareItemMobile () {
      const shareData = {
        // title: 'MDN',
        // text: 'Learn web development on MDN!',
        // url: 'https://developer.mozilla.org',
        url: `${process.env.baseUrl}/r/${this.item.recipe.slug}`
      }
      // Must be triggered some kind of "user activation"
      try {
        await navigator.share(shareData)
        // resultPara.textContent = 'MDN shared successfully'
        console.log('MDN shared successfully')
      } catch (err) {
        // resultPara.textContent = 'Error: ' + err
        console.log('Error: ' + err)
      }
      console.log(shareData)
    }
  }
}
</script>
