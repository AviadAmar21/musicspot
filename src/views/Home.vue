<template>
  <div class="home">
    <ProfilesViewer :tableName ="'profiles'"/>
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
}
</script>
