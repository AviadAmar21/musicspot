<template>
  <div class="q-pa-md">

    <q-table
        title="Profiles"
        :data="this.profiles"
        :columns="columns"
        row-key="name"
        binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td  key="name" :props="props" @click="goToProfile(props.row.userId , props.row.id)">{{ props.row.name }}</q-td>
          <q-td key="age" :props="props" @click="goToProfile(props.row.userId, props.row.id)">{{ props.row.age }}</q-td>
          <q-td key="price" :props="props" @click="goToProfile(props.row.userId, props.row.id)">{{ props.row.price }}</q-td>
          <q-td key="specialties" :props="props" @click="goToProfile(props.row.userId, props.row.id)">{{ props.row.specialties }}</q-td>
          <q-td key="exper" :props="props" @click="goToProfile(props.row.userId, props.row.id)">{{ props.row.exper }}</q-td>
          <q-td key="about" :props="props" @click="goToProfile(props.row.userId, props.row.id)">{{ props.row.about }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn v-if="currentUser.uid === props.row.userId" @click="removeProfile(props.row.id)">
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

      ],
      currentUser : window.user
    }

  },

  computed: mapState('profiles', ['editedProfileId', 'profiles']),

  methods: {
    ...mapActions('profiles', ['getProfiles', 'deleteProfile']),
    ...mapMutations('profiles', ['setEditedProfileId', 'changeEditedProfileById']),
    goToProfile(userId,id) {
      if(this.currentUser.uid === userId) {
        this.$router.push(`edit/profile/${id}`);
      }
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

}

</script>

<style lang="sass">

</style>
