<template>
  <div class="d-print-none mt-5">
    <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
    <div v-for="number, index in numbers" :key="'cs' + index">
      <CardSmall :number="number" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OtherRecipes',
  data() {
    return {
      numbers: []
    }
  },
  computed: {
    ...mapGetters({
      // currentUser: 'users/sessions/current',
      // isMobile: 'isMobile',
      // recipe: 'recipes/recipe',
      items: 'recipes/listSorted',
    }),
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData',
      // fetchRecipe: 'recipes/recipe',
    }),
    getRandomNumbers (max) {
      while(this.numbers.length < 5){
        const num = Math.floor(Math.random() * Math.floor(max > 0 ? max - 1 : 0))
        if(this.numbers.indexOf(num) === -1) this.numbers.push(num)
      }
    }
  },
  async fetch() {
    await this.getStoreData()
  },
  mounted() {
    this.getRandomNumbers(this.items.length)
  }
}
</script>
