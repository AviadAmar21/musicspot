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

      <q-btn dense @click="signIn(userEmail,userPassword)">Log in</q-btn>

    </div>
  </template>

<script>
import firebaseInstance from '../middleware/firebase'
export default {
  name: "SignIn",

  data() {
    return {
      userEmail: '',
      userPassword: '',
      isPwd: true,
      errorMessage: '',
      signTry : false
    }
  },

  methods: {
    signIn(email,password) {
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

<style scoped>

</style>