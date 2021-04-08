<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="glossy">
      <q-toolbar class="constrain">
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
            class="desktop-only absolute-bottom-left"
        />

      </q-toolbar>
    <div class="q-px-lg q-pt-xl q-mb-md ">
        <div style="display: flex">
          <div class="logo-div"><span class="app-name-style">MusicSer</span>
            <img src="./assets/disc.svg" class="my-logo"></div>
        </div>
        <div> {{ todaysDate }}</div>
      </div>
      <q-img
          src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          class="header-image absolute-top"
      />
      <q-btn
          v-if="isLogIn"
          @click="logout()"
          icon="eva-log-out"
          class="absolute-bottom-right mobile-only text-grey-5"
          color="black-5"


      />

    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
        class="desktop-only"
    >

      <q-scroll-area style="height: calc(100% - 185px); margin-top: 185px; border-right: 1px solid #ddd">
        <q-list padding>

          <q-item v-if="isLogIn" clickable v-ripple @click="logout()" exact>
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>

            <q-item-section>
              Log Out
            </q-item-section>

          </q-item>


          <q-item clickable v-ripple to="/home" exact>
            <q-item-section avatar>
              <q-icon name="home"/>
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>

          </q-item>
          <q-item clickable v-ripple to="/admin" exact>
            <q-item-section avatar>
              <q-icon name="edit"/>
            </q-item-section>

            <q-item-section>
              Edit
            </q-item-section>
          </q-item>


        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" id="myimg"
             src="https://images.pexels.com/photos/316163/pexels-photo-316163.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
             style="height: 185px">
        <div class="absolute-bottom bg-transparent">
          <!--          <div class="text-weight-bold">Razvan Stoenescu</div>-->
          <!--          <div>@rstoenescu</div>-->
        </div>
      </q-img>
    </q-drawer>

    <q-footer class="bg-black mobile-only" bordered>
      <q-tabs class="text-grey-4" active-color="grey-9" indicator-color="transparent">
        <q-route-tab
            name="home"
            icon="eva-home-outline"
            to="/home"/>
        <q-route-tab
            name="edit"
            icon="eva-edit-outline"
            to="/admin"/>
        <q-route-tab
            name="camera"
            icon="eva-camera-outline"
            to="/upload-Post"/>
        <q-route-tab
            name="feed"
            icon="eva-hash"
            to="/feed"/>
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

import Home from "./views/Home";
import {date} from 'quasar';
import firebaseInstance from './middleware/firebase';
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'LayoutDefault',

  components: {
    Home
  },

  data() {
    return {
      leftDrawerOpen: false,
      // miniState: true,
    }
  },

  methods: {
    ...mapMutations('profiles', ['setUserLogIn']),
    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        console.log('User logout from MusicSer app');
        // Sign-out successful.
        this.$router.push('/');
      }).catch((error) => {
        // An error happened.
        console.error(error);
      });
    }
  },


  computed: {
    ...mapState('profiles', ['isLogIn']),
    todaysDate() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM');
    }

  },

  created() {
    if (window.user) {
      this.setUserLogIn(true);
    } else {
      this.setUserLogIn(false);

    }
  }
}
</script>

<style lang="sass">
.header-image
  height: 100%
  z-index: -1
  opacity: 0.2
  filter: grayscale(100%)


#myimg
  height: 100%
  z-index: -1
  opacity: 0.8


.my-logo
  height: 50px
  width: 50px


.logo-div
  margin-top: 20px



.app-name-style
  font-size: x-large
  background-color: #9C27B0


.q-footer
  .q-tab__icon
    font-size: 20px



</style>
