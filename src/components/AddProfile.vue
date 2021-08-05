<template>
  <div class="q-pa-md">

    <q-input outlined dense v-model="localEditedProfile.name" label="Name" type="text"/>
    <q-input outlined dense v-model="localEditedProfile.age" label="Age" type="number"/>
    <q-input outlined dense v-model="localEditedProfile.price" label="Price" type="number"/>
    <q-input outlined dense v-model="localEditedProfile.specialties" label="Specialties" type="text"/>
    <q-input outlined dense v-model="localEditedProfile.exper" label="Years of experience " type="number"/>
    <q-input outlined dense v-model="localEditedProfile.profileImg" label="Profile image [URL]" type="text"/>
    <!--    <progress value="0" max="100" v-model="uploader">0%</progress>-->
    <!--    <q-input type="file" value="upload" v-model="uploadImg"></q-input>-->
    <div>
      <q-btn @click="click1">choose a photo</q-btn>
      <input type="file" ref="input1"
             style="display: none"
             @change="profileImage" accept="image/*"/>
    </div>

    <div v-if="profileImageData!=null">
      <img class="preview" height="268" width="356" :src="localEditedProfile.profileImg">
      <br>
    </div>
    <q-input outlined dense v-model="localEditedProfile.coverImg" label="Cover image [URL]" type="text"/>
    <div>
      <q-btn @click="click2">choose a photo</q-btn>
      <input type="file" ref="input2"
             style="display: none"
             @change="coverImage" accept="image/*"/>
    </div>

    <div v-if="coverImageData!=null">
      <img class="preview" height="268" width="356" :src="localEditedProfile.coverImg">
      <br>
    </div>
    <q-input dense outlined v-model="tempVideo" label="Youtube video [URL]" type="text"/>
    <q-btn color="white" text-color="black" label="Add video" @click="insertVideo()"/>
    <br>
    <q-input dense outlined v-model="localEditedProfile.about" label="About yourself" type="textarea"/>

    <div v-for="(video,index) of localEditedProfile.videos">
      <iframe :src=video frameborder="0" allowfullscreen="allowfullscreen" width=100%></iframe>
      <q-btn color="white" text-color="black" icon="delete" @click="deleteVideo(index)"/>
    </div>

    <q-btn v-if="!this.editedProfile.id && !userAddProfile" color="white" text-color="black" label="Add" @click="insert()"/>
<!--    <span class="text-caption" v-else> Already signed in to MusicServ app! :)</span>-->
    <q-btn v-if="this.editedProfile.id" color="white" text-color="black" label="Update" @click="update()"/>
  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
// import api from '../middleware/api'
// import firebaseDatabase from '../middleware/firebase/database'
// import firebaseInstance from '../middleware/firebase'
import firebaseStorage from '../middleware/firebase/storage'
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "addProfile",
  props: ['tableName'],
  computed: mapState('profiles', ['editedProfile', 'profiles']),


  data() {
    return {

      localEditedProfile: {
        name: '',
        age: 0,
        price: 0,
        specialties: '',
        exper: 0,
        about: '',
        //genres: '',
        coverImg: '',
        // category:'', // to do : inputs for categories
        // subcategory : ''
        videos: [],
        profileImg: ''
      },

      tempVideo: '',
      profileImageData: null,
      coverImageData: null,
      userAddProfile: false,
    }
  },

  methods: {
    ...mapActions('profiles', ['insertProfile', 'updateProfile', 'setEditProfileById']),
    ...mapMutations('profiles', ['setEditedProfile', 'setEditedProfileId']),

    localSetEditedProfile() {
      this.setEditedProfile(this.localEditedProfile);
      this.localEditedProfile = {};
    },

    goToAdminPage() {
      this.$router.push('/admin');
    },

    insert() {
      this.localSetEditedProfile();
      this.insertProfile();
    },

    update() {
      this.localSetEditedProfile();
      this.updateProfile();
      this.goToAdminPage();
    },

    insertVideo() {
      const youtubeUrl = '//www.youtube.com/embed/'
      let youtubeId = this.getYoutubeId(this.tempVideo);
      if (!this.localEditedProfile.videos.length) {
        this.localEditedProfile.videos = [];
      }
      this.localEditedProfile.videos.push(youtubeUrl + youtubeId);
      this.tempVideo = '';
    },

    getYoutubeId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11)
          ? match[2]
          : null;
    },

    deleteVideo(index) {
      this.localEditedProfile.videos.splice(index, 1);
    },

    click1() {
      this.$refs.input1.click()
    },

    click2() {
      this.$refs.input2.click()
    },

    profileImage(event) {
      debugger
      this.profileImageData = event.target.files[0];
      firebaseStorage.uploadPhoto({entity: 'profileImages', file: this.profileImageData})
          .then(res => {
            this.localEditedProfile.profileImg = res;
          })
    },

    coverImage(event) {
      this.coverImageData = event.target.files[0];
      firebaseStorage.uploadPhoto({entity: 'coverImages', file: this.coverImageData})
          .then(res => {
            this.localEditedProfile.coverImg = res;
          })
    }

  },

  created() {
    if (this.$route.params.id) {
      this.setEditedProfileId(this.$route.params.id);
      this.setEditProfileById()
          .then(() => {
            Object.assign(this.localEditedProfile, this.editedProfile);
          })
    }

    if ((this.profiles.filter(profile => profile.userId === window.user.uid)).length) {
      this.userAddProfile = true;
    }

  },
}


</script>

<style scoped>

</style>


