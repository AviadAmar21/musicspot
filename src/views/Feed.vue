<template>
  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts">
          <q-card
              v-for="post in posts"
              :key="post.id"
              class="card-post q-mb-md"
              flat
              bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img
                      :src="post.userImg">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">{{ post.userName | niceName }}</q-item-label>
                <q-item-label caption>
                  {{ post.location }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator/>

            <q-img
                :src=post.imgUrl
            />

            <q-card-section>
              <div>{{ post.caption }}</div>
              <div class="text-caption text-grey"> {{ post.date | niceDate }}</div>
            </q-card-section>

          </q-card>
        </template>
        <template v-else>
          <q-card flat bordered >
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade"/>
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade"/>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade"/>

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade"/>
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade"/>
            </q-card-section>
          </q-card>
        </template>

      </div>
      <!--      <div class="col-4 desktop only">-->
      <!--        <q-item class="fixed">-->
      <!--          <q-item-section avatar >-->
      <!--            <q-avatar size="48px">-->
      <!--              <img-->
      <!--                  src="https://firebasestorage.googleapis.com/v0/b/musicser-vue.appspot.com/o/profileImages%2F21740066_1841471345867598_3541352073801747743_n.jpg?alt=media&token=cefeb201-a9ff-444c-bfa4-218117e4c054">-->
      <!--            </q-avatar>-->
      <!--          </q-item-section>-->

      <!--          <q-item-section>-->
      <!--            <q-item-label class="text-bold">Aviad_Amar</q-item-label>-->
      <!--            <q-item-label caption>-->
      <!--              Aviad Amar-->
      <!--            </q-item-label>-->
      <!--          </q-item-section>-->
      <!--        </q-item>-->
      <!--      </div>-->

    </div>

  </q-page>
</template>

<script>
import {date} from 'quasar';
import firebase from '../middleware/firebase/database'

export default {

  name: "Feed",

  data() {
    return {
      posts: [],
      loadingPosts: false
    }
  },

  methods: {
    async getPosts() {
      this.loadingPosts = true;
        this.posts = await firebase.get({entity: 'posts'})
        this.loadingPosts = false;
    }
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D h:mmA')
    },
    niceName(name) {
      const coolName = name.split(' ');
      return `${coolName[0]}__${coolName[1]}`
    }
  },

  created() {
    debugger
    this.getPosts()

  }

}
</script>

<style lang="sass">
.constrain
  max-width: 975px
  margin: 0 auto

.card-post
  .q-img
    min-height: 200px

</style>
