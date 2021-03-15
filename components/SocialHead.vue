<template>
  <span v-if="false" />
</template>

<script>
export default {
  props: ['item'],
  head() {
    return {
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.item.recipe.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.item.recipe.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.item.recipe.photo.openGraph.url
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.item.recipe.title
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '570259036897585'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.item.recipe.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.item.recipe.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.item.recipe.photo.openGraph.url
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.item.recipe.photo.openGraph.url
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.item.recipe.title
        }
      ]
    }
  },
}
</script>
