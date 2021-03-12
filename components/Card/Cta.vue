<template>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['item'],
  computed: {
    ...mapGetters([
      'isMobile',
    ]),
  },
}
</script>
