<template>
  <div class="main">
    <div class="images">
      <q-img :src=profile.coverImg
             class="coverImg"


      />
      <q-img :src=profile.profileImg
             class="profileImg"
      />
    </div>

      <q-list dense class="my-list" bordered padding  >
        <q-item>
          <q-item-section>
            <q-item-label overline>{{ profile.name }}</q-item-label>
            <q-separator spaced />

            <q-item-label>About me</q-item-label>

            <q-item-label caption>{{ profile.about }}</q-item-label>

          </q-item-section>



        </q-item>

        <q-separator spaced />

        <q-item-label header>More</q-item-label>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="workspaces" />
          </q-item-section>
          <q-item-section>I'm specialize in {{profile.specialties }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="library_music" />
          </q-item-section>

        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="timeline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Years of experience</q-item-label>
            <q-item-label caption lines="2">{{profile.exper}} years </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Age</q-item-label>
            <q-item-label caption>{{profile.age}} years old</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="price_change" />

          </q-item-section>

          <q-item-section>
            <q-item-label>Price</q-item-label>
            <q-item-label caption>{{profile.price}}$  </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
</template>



<script>
export default {
  name: "Profile",
  props: ['tableName', 'profile'],


  data() {
    return {
      filteredProfiles: {}// for avoid rendering irrelevant data
    }
  },

  created() {
    this.removeKeys();
  },

  methods: {
    removeKeys() {
      for (let key in this.profile) {
        if (!(key == 'id' || key == 'profileImg' || key == 'coverImg')) {
          this.filteredProfiles[key] = this.profile[key];
        }
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

.my-card
  width: 2000px
  max-width: 450px
  position: relative
  bottom: 135px

.coverImg
  width: 100%
  height: 400px
  border: solid 2px #dddddd
  object-fit: cover


.profileImg
  border-radius: 50%
  width: 150px
  height: 150px
  position: relative
  bottom: 140px
  border: solid 3px #dddddd

.images
  display: flex
  flex-direction: column
  align-items: center

@media only screen and (max-width: 700px)
  .coverImg
    height: auto

  .main
    width: 100%
  .my-list
    bottom: 115px

  .profileImg
    bottom: 114px

</style>
