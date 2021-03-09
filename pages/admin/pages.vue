<template>
  <div class="container">
    <h1>Pages</h1>
    <NuxtLink to="/p/new">Créer une nouvelle page</NuxtLink>
    <div class="d-flex my-3">
      <div class="mr-3">
        <label for="inputPageLocale">{{ $t('page.new.locale') }}</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineFr" name="localeRadioInline" class="custom-control-input" value="fr" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineFr">Fr</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineEn" name="localeRadioInline" class="custom-control-input" value="en" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineEn">En</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineEs" name="localeRadioInline" class="custom-control-input" value="es" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineEs">Es</label>
      </div>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">{{ $t('pages.locale') }}</th>
          <th scope="col">{{ $t('pages.title') }}</th>
        </tr>
      </thead>
      <tbody
        v-for="(page, index) in pages"
        :key="page.id"
      >
        <tr v-if="page.locale === locale">
          <th scope="row" class="text-uppercase">{{ page.locale }}</th>
          <td>
            <NuxtLink :to="'/p/' + page.slug">{{ page.title }}</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pages',
  middleware: ['authenticated', 'admin'],
  data () {
    return {
      componentKey: 0,
      locale: 'fr',
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      pages: 'pages/all',
      currentUser: 'users/sessions/current',
      // isMobile: 'isMobile',
    }),
  },
}
</script>
