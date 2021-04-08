<template>
  <div class="main">
    <q-list class="my-list" bordered padding>
      <q-item>
        <q-item-section>
          <q-item-label overline> My Videos</q-item-label>

        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"/>
        </q-item-section>

      </q-item>

      <iframe v-if="profile.videos" :src=profile.videos[index] frameborder="0" allowfullscreen="allowfullscreen"
              width=100% height=300px></iframe>


      <div class="row justify-center">
        <q-btn
            glossy
            label="SWAP"
            @click="swapVideo()"
        />
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "profileVideoCarousel",
  props: ['profile'],
  data() {
    return {
      slide: 'Rihanna',
      index: 0
    }
  },

  methods: {

    swapVideo() {
      if (this.index === this.profile.videos.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }


  }
}
</script>

<style lang="sass">

.main
  width: 50%
  margin: 0 auto

.my-list
  position: relative
  bottom: 140px

@media only screen and (max-width: 700px)
  .main
   width: 100%

  .my-list
    bottom: 115px


</style>