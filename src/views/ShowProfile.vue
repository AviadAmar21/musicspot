<template>
  <div class="home">
    <Profile :profile="profile"/>
    <profileVideoCarousel :profile="profile"/>
  </div>
</template>

<script>
import localStorageDrive from '../middleware/local-storage';
import Profile from '../components/Profile';
import profileVideoCarousel from '../components/profileVideoCarousel';
import api from "@/middleware/api";
import firebaseDatabase from '../middleware/firebase/database'

export default {
  name: "ShowProfile",
  components: {
    Profile, profileVideoCarousel,
  },


  data() {
    return {
      profile: {},
      tableName: 'profiles',
    }
  },

  methods: {
    getProfileById() {
      firebaseDatabase.getProfileById({entity: this.tableName, profileId: this.$route.params.id})
          .then(response => {
            this.profile = response;
          })
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