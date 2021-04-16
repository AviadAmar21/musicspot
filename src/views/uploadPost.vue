<template>
  <div>
    <q-page class="constrain-more q-pa-md">
      <div class="camera-frame q-pa-md">
        <video
            v-show="!imageCaptured"
            ref="video"
            class="full-width"
            autoplay

        />
        <canvas
            v-show="imageCaptured"
            ref="canvas"
            class="full-width"
            height="240"

        />
      </div>

      <div class="text-center q-ma-pd">
        <q-btn
            v-if="hasCameraSupport"
            @click="captureImage"
            round
            color="grey-10"
            icon="eva-camera"
            size="lg"
        />
        <q-file
            v-else
            @input="captureImageFallback"
            outlined
            v-model="imageUpload"
            label="Choose an image"
            accept="image/*"

        >
          <template v-slot:prepend>
            <q-icon name="eva-attach-outline"/>
          </template>
        </q-file>
        <div class="row justify-center q-ma-md">
          <q-input
              v-model="post.caption"
              class="col col-sm-6"
              label="Caption"
              dense
          />
        </div>
        <div class="row justify-center q-ma-md">
          <q-input
              v-model="post.location"
              :loading="locationLoading"
              class="col col-sm-6"
              label="Location"
              dense

          >
            <template v-slot: append>
              <q-btn
                  v-if="!locationLoading && locationSupported"
                  @click="getLocation"
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

import {uid} from 'quasar' // todo: remove this after database import
require('md-gum-polyfill')

export default {

  name: "uploadPost",
  data() {
    return {
      post: {
        id: uid(),
        location: '',
        caption: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [], // accepts array by quasar docs
      hasCameraSupport: true,
      locationLoading : false
    }
  },

  computed : {
    locationSupported() { //checks if location works in client browser
      if('geolocation' in navigator) return true
      return false
    }
  },

  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream;
      }).catch(error => {
        this.hasCameraSupport = false;
      })
    },

    captureImage() {
      let video = this.$refs.video,
          canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera()

    },

    captureImageFallback(file) {
      this.post.photo = file;

      let canvas = this.$refs.canvas,
          context = canvas.getContext('2d');


      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    },

    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      let byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      let ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      let ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      let blob = new Blob([ab], {type: mimeString});
      return blob;

    },

    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityAndCountry(position);
      }, err => {
        this.locationError()
      }, {timeout: 5000}) // limit api time data response
    },

    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      const axios = require('axios');
      axios.get(apiUrl).then(result => {
        this.locationSuccess(result);
      }).catch(err => {
        this.locationError()
      })


    },

    locationSuccess(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `,${result.data.country}`
      }
      this.locationLoading = false;
    },

    locationError() {
      this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location'
      })
      this.locationLoading = false;

    }
  },

  mounted() {
    this.initCamera();
  },

  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  }
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