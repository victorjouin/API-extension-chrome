import Vue from 'vue'

import '../imports/ui/plugins'
import { vuetify, router} from '../imports/ui/plugins'
import 'vuetify/dist/vuetify.min.css';


import App from '../imports/ui/App.vue'

/*
const axios = require('axios').default;

router.afterEach((to, from) => {
  Meteor.call('getIp' , ((error, ip) => {
    if (!error) {
      console.log(ip);
      ip.then((val) => {
        console.log(val);
      }).catch((getError) => { console.log(getError); });
    } else {
      console.log(error);
    }
  }))
})*/

Meteor.startup(() => {
  new Vue({
    vuetify,
    router, 
    render: h => h(App)
  }).$mount('#app')
})
