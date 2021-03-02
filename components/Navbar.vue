<template>
 <div>
   <navbar-small v-if="mobile" />
   <navbar-large v-else />
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
const NavbarLarge = () => import('../components/NavbarLarge.vue')
const NavbarSmall = () => import('../components/NavbarSmall.vue')

export default {
  name: 'Navbar',
  data () {
    return {
      componentKey: 0,
    }
  },
  components: {
    NavbarLarge,
    NavbarSmall,
  },
  computed: {
    ...mapGetters(['mobile'])
  },
  mounted () {
    // document.querySelector('#preload').remove()
  }
}
</script>
