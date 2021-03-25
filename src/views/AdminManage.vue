<template>
  <div class="home">
        <AddProfile :tableName="'profiles'" @profileAdded="reloadTable"/>
        <TableViewer :tableName="'profiles'" :isReload="isReload"/>
  </div>
</template>

<script>
// @ is an alias to /
import AddProfile from "../components/AddProfile";
import TableViewer from "../components/TableViewer";
import ShowProfiles from "@/components/ProfilesViewer";


export default {
  name: 'AdminManage',
  components: {
    AddProfile, TableViewer
  },

  data() {
    return {
      isReload: false
    }
  },
  methods: {
    reloadTable() {
      this.isReload = !this.isReload;

    }
  }
}
</script>
