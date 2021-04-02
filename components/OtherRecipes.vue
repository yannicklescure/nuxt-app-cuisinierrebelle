<template>
  <div class="d-print-none mt-3">
    <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
    <div v-for="number, index in numbers" :key="'cs' + index">
      <CardSmall :number="number" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtherRecipes',
  props: ['recipes'],
  data () {
    return {
      numbers: [],
    }
  },
  methods: {
    getRandomNumbers (max) {
      while(this.numbers.length < 5){
        const num = Math.floor(Math.random() * Math.floor(max > 0 ? max - 1 : 0))
        if(this.numbers.indexOf(num) === -1) this.numbers.push(num)
      }
    }
  },
  mounted () {
    this.getRandomNumbers(this.recipes.length)
  }
}
</script>
