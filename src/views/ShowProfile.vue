<template>
  <div class="home">
    <Profile :profile="profile"/>
    <profileVideoCarousel :profile="profile"/>
  </div>
</template>

<script>
// import localStorageDrive from '../middleware/local-storage';
import Profile from '../components/Profile';
import profileVideoCarousel from '../components/profileVideoCarousel';
// import api from "@/middleware/api";
import firebaseDatabase from '../middleware/firebase/database'
import {mapState, mapActions} from 'vuex';

export default {
  name: "ShowProfile",
  components: {
    Profile, profileVideoCarousel,
  },


  data() {
    return {
      profile: {},
      tableName: 'profile',
    }
  },

  computed: mapState('profiles',['profiles']),

  methods: {
    ...mapActions('profiles',['getProfiles']),
    getProfileById() {
      let arr = [];
      arr = this.profiles.filter(profile => profile.id === this.$route.params.id);
      Object.assign(this.profile,arr[0]);
      // firebaseDatabase.getProfileById({entity: this.tableName, profileId: this.$route.params.id})
      //     .then(response => {
      //       this.profile = response;
      //     })
      // this.profile = localStorageDrive.getProfileById(this.tableName,this.$route.params.id);
    }
  },

  created() {
      this.getProfileById();
  }


}
</script>

<style>

</style>