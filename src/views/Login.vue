<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="purple"
          indicator-color="purple"
          align="justify"
          narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
            <SignIn/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <Register/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import Register from './Register'
import SignIn from "./SignIn";
import GoogleLogin from "../components/GoogleLogin";

export default {
  name: "Login",
  components: {GoogleLogin, SignIn, Register},
  data() {
    return {
      tab: 'login'
    }
  },

  methods: {
    googleLogin() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            window.user = result.user;
            let myUser = {};
            myUser.email = user.email;
            myUser.id = window.user.uid;
            firebaseInstance.firebase.database().ref(`users/`).push(myUser); //todo: fix database saves duplicate users by add log in google button
            this.$router.push('/home');
            // ...
          }).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
    },

    signIn() {
      this.$router.push('/signin');
    },

    Register() {
      this.$router.push('/register');
    }
  },


  created() {
    if(window.user) {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>

</style>
