<template xmlns="http://www.w3.org/1999/html">
  <q-page clss="column">
    <div class="q-pa-md">
      <q-input class="col" dense outlined v-model="search" label="Search by EVERYTHING" type="text" style="margin : 15px 0"/>
      <!--      <br>-->

      <q-card  class="my-card" v-for="(profile, key ) of filterdProfiles" :key="key">
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
            <!--          <img src='../assets/logo.png'>-->
            <div class="text-subtitle1" @click="goToProfile(profile.id)">{{ profile.name }}</div>
          </q-card-section>


          <q-card-section class="q-pt-none">
            <span> My music experience is in  {{ profile.specialties }}  </span>
            <br>
            <span>{{ profile.age }} Years old </span>
            <br>
            <span>{{ profile.price }}$ </span>


            <!--        price: {{ profile.price }}$-->
            <!--        <br>-->
            <!--        specialties: {{ profile.specialties }}-->
            <!--        <br>-->
            <!--        years of experience: {{ profile.exper }}-->
            <!--        <br>-->
            <!--        about : {{ profile.about }}-->

          </q-card-section>
        </q-expansion-item>

      </q-card>


    </div>

  </q-page>
</template>

<script>
import localStorageDriver from '../middleware/local-storage';
import api from '../middleware/api';
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
    this.read();

    // this.data = localStorageDriver.dbSelect(this.tableName);
  },

  methods: {
    ...mapActions('profiles',['getProfiles']),
    // ...mapGetters('profiles',['searchProfile']),
    goToProfile(id) {
      this.$router.push(`/profile/${id}`);

    },

    read() {
      this.getProfiles()
    },
    // filterdProfiles: function () {
    //   return this.data.filter((profile, key) => {
    //     return profile.name.match(this.search) || profile.specialties.match(this.search) || profile.about.match(this.search) ||
    //         profile.age === this.search || profile.price === this.search || profile.exper === this.search
    //
    //   });
    // }


  },


  computed: {
    ...mapState('profiles', ['profiles']),
    filterdProfiles: function () {
      return this.profiles.filter((profile, key) => {
        return profile.name.match(this.search) || profile.specialties.match(this.search) || profile.about.match(this.search) ||
            profile.age === this.search || profile.price === this.search || profile.exper === this.search

      });
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 55%
  padding: revert
  margin: inherit
</style>