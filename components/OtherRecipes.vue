<template>
  <div class="d-print-none mt-5">
    <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
    <CardSmall v-for="index in 5" :key="'cs' + index" />
  </div>
</template>

<script>

export default {
  name: 'OtherRecipes',
}
</script>
