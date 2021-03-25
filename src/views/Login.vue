<template>
  <div>
    <q-btn @click="login()" >Google login</q-btn>
    <q-btn @click="signIn()">Sign in</q-btn>
    <q-btn @click="Register()">Register</q-btn>

  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'

export default {
  name: "Login",
  methods: {
    login() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.user = result.user;
            this.$router.push('/home');
            // ...
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
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