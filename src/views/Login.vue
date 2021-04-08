<template>
  <div>
    <q-btn @click="googleLogin()" icon="eva-google" ></q-btn>
    <q-btn @click="signIn()">Log in</q-btn>
    <q-btn @click="Register()">Register</q-btn>

  </div>

</template>

<script>
import firebaseInstance from '../middleware/firebase'

export default {
  name: "Login",
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