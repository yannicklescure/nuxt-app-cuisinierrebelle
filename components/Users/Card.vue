<template>
  <tr class="d-flex justify-content-between align-items-center">
    <td class="d-flex justify-content-start align-items-center">
      <NuxtLink :to="`/u/${ item.slug }`" class="text-capitalize text-body d-flex align-items-center">
        <img :src="item.image.thumb.url" :alt="item.name" class="mr-2 rounded-circle" width="32" height="32" style="object-fit: cover;">
        {{ item.name }}
      </NuxtLink>
    </td>
    <td>
      <BtnFollow :item="item" />
    </td>
  </tr>
</template>

<script>
// import Follow from '../components/buttons/Follow.vue'
// const Follow = () => import('../components/buttons/Follow.vue')

export default {
  name: 'UsersCard',
  props: ['item'],
  // data () {
  //   return {}
  // },
  // components: {
  //   Follow,
  // },
}
</script>
