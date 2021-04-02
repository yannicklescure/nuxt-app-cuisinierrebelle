<template>
  <div class="d-flex justify-content-center my-5 d-print-none">
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
      class="mouse-pointer text-decoration-none text-light mx-2"
    >
      <div
        class="d-flex justify-content-center rounded align-items-center py-1 px-2"
        :style="`backgroundColor: ${ network.color }`"
      >
        <font-awesome-icon :icon="network.icon" class="icon-24" />
        <span class="ml-2">{{ network.name }}</span>
      </div>
    </ShareNetwork>
  </div>
</template>

<script>
// import { FontAwesomeLayers, FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
// import { faFacebookF, faTelegramPlane, faTwitter, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// library.add(faEnvelope, faFacebookF, faTelegramPlane, faTwitter, faVk, faWhatsapp)

export default {
  name: 'BtnSocialSharing',
  props: ['item'],
  // components: {
  //   FontAwesomeIcon,
  //   FontAwesomeLayers,
  // },
  data () {
    return {
      sharing: {
        url: `${ process.env.baseUrl }/r/${ this.item.recipe.slug }`,
        title: '',
        description: '',
        // quote: 'The hot reload is so fast it\'s near instant. - Evan You',
        hashtags: `CuisinierRebelle,${ this.item.user.slug }`,
        // twitterUser: ''
      },
      networks: [
        { network: 'email', name: 'Email', icon: ['fas', 'envelope'], color: '#333333' },
        { network: 'facebook', name: 'Facebook', icon: ['fab', 'facebook-f'], color: '#1877f2' },
        { network: 'telegram', name: 'Telegram', icon: ['fab', 'telegram-plane'], color: '#0088cc' },
        { network: 'twitter', name: 'Twitter', icon: ['fab', 'twitter'], color: '#1da1f2' },
        { network: 'vk', name: 'Vk', icon: ['fab', 'vk'], color: '#4a76a8' },
        { network: 'whatsapp', name: 'Whatsapp', icon: ['fab', 'whatsapp'], color: '#25d366' },
      ]
    }
  },
  methods: {
    fixSharingData () {
      this.sharing.title = this.item.recipe.title ? this.item.recipe.title : 'Cuisinier Rebelle'
      // if (this.item.content === null) this.item.content = ''
      this.sharing.description = this.item.recipe.description.length >= 200 ? `${ this.item.recipe.description.substring(0, 197) }...` : this.item.recipe.description
    }
  },
  beforeMount () {
    this.fixSharingData()
  },
}
</script>
