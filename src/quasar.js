import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/eva-icons/eva-icons.css'

import { Quasar ,Dialog } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
      Dialog
  }
 })