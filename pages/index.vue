<template>
  <div class="container">
    <div class="row">
      <div v-for="item in items" :key="item.timestamp" class="col">
        <Card :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fetchedData: null
      }
    },
    async fetch() {
      this.fetchedData = await fetch(
        'https://api.cuisinierrebelle.com/v1/state'
      ).then(response => response.json())
    },
    computed: {
      items () {
        return this.fetchedData != null ? this.fetchedData.data.recipes : []
      }
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
