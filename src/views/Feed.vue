<template>
  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
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
                    src="https://firebasestorage.googleapis.com/v0/b/musicser-vue.appspot.com/o/profileImages%2F21740066_1841471345867598_3541352073801747743_n.jpg?alt=media&token=cefeb201-a9ff-444c-bfa4-218117e4c054">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">Aviad_Amar</q-item-label>
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

      </div>
      <div class="col-4 desktop only">
        <q-item class="fixed">
          <q-item-section avatar >
            <q-avatar size="48px">
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/musicser-vue.appspot.com/o/profileImages%2F21740066_1841471345867598_3541352073801747743_n.jpg?alt=media&token=cefeb201-a9ff-444c-bfa4-218117e4c054">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Aviad_Amar</q-item-label>
            <q-item-label caption>
              Aviad Amar
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

    </div>

  </q-page>
</template>

<script>
import {date} from 'quasar'

export default {

  name: "Feed",

  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: 1617722261248,
          location: 'San Fransisco, United States',
          imgUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 2,
          caption: 'Golden Gate Bridge',
          date: 1617722261248,
          location: 'San Fransisco, United States',
          imgUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 3,
          caption: 'Golden Gate Bridge',
          date: 1617722261248,
          location: 'San Fransisco, United States',
          imgUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        }
      ]
    }
  },

  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D h:mmA')
    }
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