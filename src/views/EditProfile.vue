<template>
  <div>
<!--    <AddProfile v-if="isAdded" :tableName="tableName" :profile="profile"/>-->
    <AddProfile  />
  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
import AddProfile from "@/components/AddProfile";
// import api from '../middleware/api'
// import firebaseDatabase from '../middleware/firebase/database'

export default {
  name: "EditProfile",
  components: {
    AddProfile
  },
}
  // data() {
  //   return {
  //     profile: {},
  //     tableName: 'profiles',
  //     isAdded: false
  //   }
  // },

//   methods: {
//
//     // async getProfileById() {
//     //   // this.profile = await api.getProfileById({entity:this.tableName, profileId :this.$route.params.id });
//     // }
//
//       getProfileById() {
//       // this.profile = localStorageDriver.getProfileById(this.tableName, this.$route.params.id);
//         firebaseDatabase.getProfileById({entity:this.tableName, profileId :this.$route.params.id })
//         .then(response => {
//           this.profile = response;
//           this.isAdded= true;
//         })
//     },
//   },
//
//    created() {
//      this.getProfileById();
//   }
//
// }
</script>

<style scoped>

</style>