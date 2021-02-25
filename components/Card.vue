<template>
  <div class="card">
    <img :src="item.recipe.photo.card.url" alt="">
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['item']
  }
</script>
