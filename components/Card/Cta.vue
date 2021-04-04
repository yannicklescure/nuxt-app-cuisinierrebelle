<template>
  <div class="d-flex justify-content-between align-items-start my-2">
    <div :class="['d-flex justify-content-between', $device.isMobile ? 'align-items-start' : 'align-items-center']">
      <BtnVisit :item="item" />
      <BtnComment :item="item" />
      <BtnShare :item="item" />
    </div>
    <div :class="['d-flex', $device.isMobile ? 'align-items-start' : 'align-items-center']">
      <BtnLike :item="item" />
      <BtnBookmark :item="item" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
