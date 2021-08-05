<template>
  <div>
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

</script>

<style scoped>

</style>
