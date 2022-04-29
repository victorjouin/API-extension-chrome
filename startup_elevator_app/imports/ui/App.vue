<template>
  <v-app>
    <navigation v-if="$route.name=='Accueil'" :color="color" :flat="flat" />
    <navigationform v-else-if="$route.path.includes('/form/')" :color="color" :flat="flat" />
    <v-btn style="z-index : 10" fixed top right color="primary" large v-else @click="$router.go(-1)">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-main>
      <v-app style="background-color:transparent">
          <transition name="slide"  :enter-class="transitionEnterClass" :leave-to-class="transitionLeaveToClass">
            <router-view/>
          </transition>
      </v-app>
    </v-main>
    <v-scale-transition v-if="!$route.path.includes('form')">
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <foote v-if="$route.name=='Accueil'" :color="color" :flat="flat"/>
  </v-app>
</template>

<style scoped>
.v-main {
  background-image: url("/assets/img/bgMain.webp");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<style lang="scss">
.slide-enter-active {
  transition: all .5s ease;
  overflow: hidden;
  position: absolute;
}
.slide-leave-active {
  position: absolute;
  overflow: hidden;
  transition: all .5s ease;
}
.slide-enter-left{
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to-left{
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-right{
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to-right{
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-top{
  transform: translateY(100%);
  opacity: 0;
}
.slide-leave-to-top{
  //transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-bottom{
  //transform: translateY(-100%);
  opacity: 0;
}
.slide-leave-to-bottom{
  transform: translateY(100%);
  opacity: 0;
}
</style>

<script>
import navigation from "./components/Navigation";
import navigationform from "./components/NavigationForm";
import foote from "./components/MyFooter";
import home from "./components/HomeSection";
import about from "./components/AboutSection";
import download from "./components/DownloadSection";
import pricing from "./components/PricingSection";
import startproject from "./components/StartProjectSection";
import company from "./components/OurCompanySection";
import contact from "./components/ContactSection";

export default {
  name: "App",

  components: {
    navigation,
    navigationform,
    foote,
    home,
    about,
    download,
    pricing,
    startproject,
    company,
    contact
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    yearsInCompany : 3,
    prevRoutePath : "/",
    myScrollPosition : 0,
  }),

  created() {
    const top = window.pageYOffset || 0;
    
    if (top <= 60) {
      this.color = "white";
      this.flat = true;
    }

    
    Meteor.call('upsertLog', this.$router.history.current.path)
    this.$router.beforeEach((to, from, next)=> {
      let currentProjectId = this.$cookies.get('currentProjectId')  
      Meteor.call('upsertLog', to.path, currentProjectId)
      this.prevRoutePath = from.path
      next()
    })

  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "white";
        this.flat = false;
      } else {
        this.color = "white";
        this.flat = true;
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    setYearInCompany(newYears){
      this.yearsInCompany = newYears;
    }
  },
  computed : {
    transitionEnterFrom() {
      switch (true) {
        case this.prevRoutePath.includes("form") && this.prevRoutePath.includes("project"):{
           if (this.$route.path.includes("form")) {
             return "right"
           } else {
             return "bottom"
           }
        }
        case this.prevRoutePath.includes("form") && this.prevRoutePath.includes("profile"):{
          if (this.$route.path.includes("form")) {
             if (this.$route.path.includes("reussir") || this.$route.path.includes("financement")) {
               return "right"
             }
             return "left"
           } else {
             return "bottom"
           }
        }
        case this.prevRoutePath.includes("form") && this.prevRoutePath.includes("reussir"):{
          if (this.$route.path.includes("form")) {
            if (this.$route.path.includes("financement")) {
              return "right"
            }
            return "left"
          } else {
            return "bottom"
          } 
        }
        case this.prevRoutePath.includes("form") && this.prevRoutePath.includes("financement"):{
          if (this.$route.path.includes("form")) {
            return "left"
          } else {
            return "bottom"
          }      
        }/*
        case this.prevRoutePath.includes("form") && this.prevRoutePath.includes("merci"):{
          return "left"
        }*/
        default:
          return "top"
      }
    },
    transitionEnterClass() {
      return 'slide-enter-'+this.transitionEnterFrom
    },
    transitionLeaveToClass() {
      return 'slide-leave-to-'+this.transitionEnterFrom
    },
  }

};
</script>
