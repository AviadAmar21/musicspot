<template>
  <div class="q-pa-md">
    <q-input dense outlined v-model="userEmail" filled type="email" hint="Enter Email"/>
    <q-input dense v-model="userPassword" filled :type="isPwd ? 'password' : 'text'" hint="Enter password">
      <template v-slot:append>
        <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <br>
    <div class="q-pa-md q-gutter-sm my-buttons">
      <q-btn color="grey-4" text-color="purple" glossy unelevated icon="eva-log-in" label="Login" @click="signIn(userEmail, userPassword)"/>
      <GoogleLogin/>
      </div>
    </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import GoogleLogin from "../components/GoogleLogin";

export default {
  name: "SignIn",
  components: {GoogleLogin},
  data() {
    return {
      userEmail: '',
      userPassword: '',
      isPwd: true,
      errorMessage: '',
      signTry: false
    }
  },

  methods: {
    signIn(email, password) {
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.user = user;
            this.userEmail = '';
            this.userPassword = '';
            this.$router.push('/home');
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            this.errorMessage = error.message;
            console.log(error.message);

          });
    }
  }

}
</script>

<style lang="scss">
.my-buttons {
  display: flex;
  justify-content: space-evenly;
}

</style>
