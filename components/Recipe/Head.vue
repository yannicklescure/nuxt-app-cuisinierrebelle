<template>
  <div class="d-flex flex-column flex-md-row justify-content-between">
    <div id="recipe-user" :class="[{'mb-0': $device.isMobile}, 'd-print-none d-flex align-items-center order-0']">
      <div class="d-flex flex-grow-1 m-0 align-items-center">
        <div class="d-flex flex-grow-1 flex-grow-md-0 justify-content-between justify-md-content-start align-items-center">
          <div class="d-flex order-0 justify-content-between justify-content-md-start flex-grow-1 align-items-center" data-user="1">
            <div class="mr-md-2 d-flex align-items-center">
              <NuxtLink
                :to="`/u/${ item.user.slug }`"
                class="text-body text-capitalize"
                style="font-size: 90%"
              >
                <img :src="item.user.image.thumb.url" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">
                {{ item.user.name }}
              </NuxtLink>
              <!-- <span v-if="item.user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex ml-1">
                <i class="material-icons md-16">check_circle</i>
              </span> -->
            </div>
            <div class="d-none mr-3 btn btn-dark btn-sm py-0">
              Follow
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$device.isMobile == false && (item.user.id === currentUser.id)" class="d-print-none">
      <NuxtLink :to="`/r/${item.recipe.slug}/edit`" class="text-body text-capitalize text-decoration-none">
        {{ $t('recipe.edit') }}
      </NuxtLink>
    </div>
    <div v-if="$device.isMobile" class="d-flex order-0 align-items-start justify-content-between my-3 mb-md-0 d-print-none">
      <div class="d-flex order-0 align-items-start">
        <BtnVisit :item="item" />
        <BtnComment :item="item" />
        <BtnShare :item="item" />
      </div>
      <div class="d-flex order-1 align-items-end">
        <BtnLike :item="item" />
        <BtnBookmark :item="item" />
      </div>
    </div>
    <div v-else class="d-flex order-0 justify-content-between d-print-none">
      <div class="d-flex align-items-center justify-content-end order-1 w-100">
        <div class="d-flex order-1 align-items-center">
          <BtnVisit :item="item" />
          <BtnPrint :item="item" />
          <BtnLike :item="item" />
          <BtnBookmark :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Head',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/current'
    })
  }
}
</script>
