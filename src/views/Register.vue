<template>
  <div class="q-pa-md">
    <q-input dense outlined v-model="userEmail" filled type="email" hint="Enter Email" />
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
      <q-btn color="grey-4" text-color="purple" glossy unelevated icon="eva-person-add" label="Register" @click="Register(userEmail,userPassword)"/>
      <GoogleLogin/>
    </div>
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import GoogleLogin from "../components/GoogleLogin";
export default {
  name: "Register",
  components: {GoogleLogin},
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
            let myUser = {};
            myUser.email = user.email;
            myUser.id = window.user.uid;
            firebaseInstance.firebase.database().ref(`users/`).push(myUser);
            this.$router.push('/home');
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

<style scoped lang="scss">
.my-buttons {
  display: flex;
  justify-content: space-evenly;
}

</style>
