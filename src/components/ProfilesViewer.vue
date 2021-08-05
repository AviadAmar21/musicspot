<template xmlns="http://www.w3.org/1999/html">
  <q-page clss="column">
    <div class="q-pa-md">
      <div>
      <q-input
          class="search-input"
          clearable
          color="purple-7"
          dense
          outlined
          v-model="search"
          label="Search by EVERYTHING"
          type="text"
          autogrow
      >
        <template v-slot:append>
          <q-icon name="eva-search-outline" />
        </template>
      </q-input>

      </div>
      <q-card class="my-card" v-for="(profile, key ) of filterdProfiles" :key="key">
        <iframe v-if="profile.videos" :src=profile.videos[0] frameborder="0" allowfullscreen="allowfullscreen" width=100%></iframe>
        <q-expansion-item
            expanded
            :label=profile.name
            :caption='profile.specialties'
            dense

        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <img :src="profile.profileImg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ profile.name }}
            </q-item-section>
          </template>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 my-text" @click="goToProfile(profile.id)" >{{ profile.name }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <span> My music experience is in  {{ profile.specialties }}  </span>
            <br>
            <span>{{ profile.age }} Years old </span>
            <br>
            <span>{{ profile.price }}$ </span>
          </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
// import api from '../middleware/api';
// import firebaseDatabase from '../middleware/firebase/database';
import {mapActions,mapState,mapGetters} from 'vuex'

export default {
  name: "ProfilesViewer",
  props: ['tableName'],

  data() {
    return {
      search: ''
    }
  },

  created() {
    this.getProfiles();
  },

  methods: {
    ...mapActions('profiles',['getProfiles']),
    goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
  },

  computed: {
    ...mapState('profiles', ['profiles']),
    filterdProfiles: function () {
      return this.profiles.filter((profile, key) => {
        return profile.name.includes(this.search) || profile.specialties.includes(this.search) || profile.about.includes(this.search) ||
            profile.age === this.search || profile.price === this.search || profile.exper === this.search
      });
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  max-width: 55%
  padding: revert
  margin: inherit
  display: grid
  margin-bottom: 15px

.search-input
  position: relative
  margin: 15px 0
  width: 30%

.my-text
  cursor: pointer

@media only screen and (max-width: 700px)
  .my-card
    max-width: 100%

@media only screen and (max-width: 700px)
  .search-input
   position: relative
   margin: 15px 0
   width: 80%





</style>
