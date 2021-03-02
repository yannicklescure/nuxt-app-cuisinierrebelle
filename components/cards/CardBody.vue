<template>
  <div class="card-body bg-white p-0">
    <router-link :to="'/r/' + item.recipe.slug">
      <div
        :class="['card-img-top d-flex justify-content-center align-items-center']"
        :style="`height: ${ card.height }px;background-image: url('${ item.recipe.photo.card.url }');`"
      >
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CardBody',
  props: ['item', 'card'],
}
</script>
