<template>
  <div class="q-pa-md">
    <q-input outlined v-model="userEmail" filled type="email" hint="Enter Email" />
    <q-input v-model="userPassword" filled :type="isPwd ? 'password' : 'text'" hint="Enter password">
      <template v-slot:append>
        <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <br>

    <q-btn @click="Register(userEmail,userPassword)">Register</q-btn>
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
export default {
  name: "Register",

  data() {
    return {
      userEmail: '',
      userPassword: '',
      isPwd: true
    }
  },

  methods : {
    Register(email,password) {
      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            window.user = user;
            this.userEmail = '';
            this.userPassword = '';
            // ...
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
          });
    }
  }


}
</script>

<style scoped>

</style>