<template>
  <q-btn @click="googleLogin()" icon="eva-google" color="grey-4" text-color="purple" glossy unelevated ></q-btn>
</template>

<script>
import firebaseInstance from "../middleware/firebase";

export default {
  name: "GoogleLogin",
  data() {
    return {
      userEmail: '',
      userPassword: '',
      isPwd: true,
      errorMessage: '',
      signTry : false
    }
  },
  methods : {
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
    }
  }
}
</script>

<style scoped>

</style>
