<template>
  <div class="home">
    <ProfilesViewer :tableName ="'profiles'"/>
<!--    <AddProfile :tableName="'profilesTable'" @profileAdded="reloadTable"/>-->
<!--    <TableViewer :tableName="'profilesTable'" :isReload="isReload"/>-->
  </div>
</template>

<script>
// @ is an alias to /
import AddProfile from "../components/AddProfile";
import TableViewer from "../components/TableViewer";
import ProfilesViewer from "@/components/ProfilesViewer";


export default {
  name: 'Home',
  components: {
    ProfilesViewer,
    AddProfile, TableViewer
  }

  // data() {
  //   return {
  //     isReload: false
  //   }
  // },
  // methods: {
  //   reloadTable() {
  //     this.isReload = !this.isReload;
  //
  //   }
  // }
}
</script>
