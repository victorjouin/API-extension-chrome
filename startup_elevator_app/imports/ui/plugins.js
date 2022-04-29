import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";

Vue.use(VueMeteorTracker)

//VUETIFY
Vue.use(Vuetify) 
export let vuetify = new Vuetify({
    theme: {
        themes : {
            light: {
                primary: "#e0a141",
                secondary: "#616161",
                accent: "#00FF00"
            },
            dark:{
                primary: "#e0a141",
                secondary: "#616161",
                accent: "#00FF00"
            }
        }
    }
});


//ROUTER
Vue.use(VueRouter)

import LandingPage from "./views/LandingPage"
import StartProjectForm from "./views/StartProjectForm"
import ProfileForm from "./views/ProfileForm"
import FinancementForm from './views/FinancementForm'
import SucceedForm from './views/SucceedForm'
import ConfidentialityPolicy from './views/ConfidentialityPolicy'
import TermOfService from './views/TermOfService'
//import ThanksForm from './views/ThanksForm'
export let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "*",
        name:"Accueil",
        component: LandingPage,
        meta: { displayToolbar: 0, toolbarColor: "#e0a141" }
      },
      {
        path: "/form/project",
        name: "Formulaire (page projet)",
        component: StartProjectForm,
        meta: {displayToolbar: 1, toolbarColor:"#e0a141" }
      },
      {
        path: "/form/profile",
        name: "Formulaire (profile)",
        component: ProfileForm,
        meta: {displayToolbar: 1, toolbarColor:"#e0a141" }
      },
      {
        path: "/form/financement",
        name: "Formulaire (financement)",
        component: FinancementForm,
        meta: {displayToolbar: 1, toolbarColor:"#e0a141" }
      },
      {
        path: "/form/reussir",
        name: "Formulaire (réussir)",
        component: SucceedForm,
        meta: {displayToolbar: 1, toolbarColor:"#e0a141" }
      },
      {
        path: "/confidentiality",
        name: "Politique de confidentialité",
        component: ConfidentialityPolicy,
        meta: {displayToolbar: 0, toolbarColor:"#e0a141" }
      },
      {
        path: "/termofservices",
        name: "Termes des services",
        component: TermOfService,
        meta: {displayToolbar: 0, toolbarColor:"#e0a141" }
      },
      
      /*
      {
        path: "/form/merci",
        name: "Formulaire (merci)",
        component: ThanksForm,
        meta: {displayToolbar: 1, toolbarColor:"#e0a141" }
      },*/
    ]
})

//COOKIES
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('90d')

//MUTEX
//import { Mutex } from 'async-mutex';
