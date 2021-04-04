<template>
  <div class="q-pa-md">

    <q-table
        title="Profiles"
        :data="profiles"
        :columns="columns"
        row-key="name"
        binary-state-sort
        dense
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td  key="name" :props="props" @click="goToProfile(props.row.id)">{{ props.row.name }}</q-td>
          <q-td key="age" :props="props" @click="goToProfile(props.row.id)">{{ props.row.age }}</q-td>
          <q-td key="price" :props="props" @click="goToProfile(props.row.id)">{{ props.row.price }}</q-td>
          <q-td key="specialties" :props="props" @click="goToProfile(props.row.id)">{{ props.row.specialties }}</q-td>
          <q-td key="exper" :props="props" @click="goToProfile(props.row.id)">{{ props.row.exper }}</q-td>
          <q-td key="about" :props="props" @click="goToProfile(props.row.id)">{{ props.row.about }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn @click="removeProfile(props.row.id)">
              Delete
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

// import localStorageDriver from '../middleware/local-storage';
// import api from '../middleware/api';
// import firebaseDatabase from '../middleware/firebase/database'

import {mapState, mapActions, mapMutations} from 'vuex';


export default {
  name: "TableViewer",
  props: ['tableName'],

  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {name: 'age', align: 'center', label: 'Age', field: 'age', sortable: true},
        {name: 'price', label: 'Price ($)', field: 'price', sortable: true},
        {name: 'specialties', label: 'Specialties', field: 'specialties'},
        {name: 'exper', label: 'Years of experience', field: 'exper', sortable: true},
        {name: 'about', label: 'About yourself', field: 'about'},
        {name: 'actions', label: 'Actions'}

      ]
    }
  },

  computed: mapState('profiles', ['editedProfileId', 'profiles']),

  methods: {
    ...mapActions('profiles', ['getProfiles', 'deleteProfile']),
    ...mapMutations('profiles', ['setEditedProfileId', 'changeEditedProfileById']),
    goToProfile(id) {
      this.$router.push(`edit/profile/${id}`);
    },

    removeProfile(id) {
      this.setEditedProfileId(id);
      this.changeEditedProfileById(id);
      this.deleteProfile()
      this.getProfiles();

    }
  },

  created() {
    this.getProfiles();
  }

  // watch: {
  //   isReload() {
  //     this.read();
  //   }
  // }

}


</script>

<style lang="sass">


</style>