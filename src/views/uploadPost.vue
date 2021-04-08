<template>
  <div>
    <q-page class="constrain-more q-pa-md">
      <div class="camera-frame q-pa-md">
        <img
            class="full-width"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
      </div>

      <div class="text-center q-ma-pd">
        <q-btn
            round
            color="grey-10"
            icon="eva-camera"
            size="lg"
        />
        <div class="row justify-center q-ma-md">
          <q-input
              v-model="text"
              class="col"
              label="Caption"
              dense
          />
        </div>

        <div class="row justify-center q-ma-md">
          <q-input
              v-model="text"
              class="col"
              label="Location"
              dense
          >
            <template v-slot: append>
              <q-btn
                  round
                  dense
                  flat
                  icon="eva-navigation-2-outline"
              />
            </template>
          </q-input>
        </div>
        <div class="row justify-center q-mt-lg">
          <q-btn
              color="primary"
              label="Post Image"
              rounded
              unelevated
          />
        </div>


      </div>


    </q-page>
  </div>
</template>

<script>
export default {
  name: "uploadPost"
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid grey
  border-radius: 10px

.constrain
  max-width: 975px
  margin: 0 auto

.constrain-more
  max-width: 600px
  margin: 0 auto


</style>