<template>
  <div>
    <q-page>
      <h3>Scraper</h3>
      <q-btn @click="startScrap" icon="start"></q-btn>
    </q-page>
  </div>
</template>

<script>

import scrap from '../webScraper/imdbScrap'

export default {
  name: "scraper",


  methods: {
    startScrap() {
      debugger
      scrap.get()
    }
  }
}
</script>

<style scoped>

</style>