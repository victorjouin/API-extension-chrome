<template>
    <v-app-bar
      app
      temporary
      :color="color"
      block
      dark
      class="ma-0"
      max-width="100vw"
    >
          <v-row justify="center" style="width: 100vw; max-width:100vw">
            <v-col :cols="isXs ? 10 : 11" class="pl-1 pr-4 py-0">
              <v-tabs slider-color="primary" background-color="transparent" color="primary" grow v-model="progressionModel">
                  <v-tab
                    v-for="(navItem, i) in navItems"
                    :key="i"
                    :disabled="isTabDisable(i)"
                    @click="$vuetify.goTo(0)"
                    style="color : #e0a161"
                    :to="{ path : navItem.route }"
                  >
                  {{ navItem.title }}
                  </v-tab>
              </v-tabs>
            </v-col>
            <v-col :cols="isXs ? 2 : 1" class="pa-0 mr-2 text-center" style="height:inherit; margin-left : -12px">             
              <v-btn class="px-0" max-width="100%" height="100%" color="primary" :to="{path : '/'}">
                  <v-icon>
                      mdi-close
                  </v-icon>
              </v-btn>
            </v-col>
          </v-row>
    </v-app-bar>
</template>

<style lang="scss">
.v-slide-group__prev {
  display : none !important;
}
</style>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
}

</style>

<script>
import Projects from '../../api/collections/Projects'

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    isCurrentProjectLoad : false,
    currentProjectId : '',
    projectInfo : {} ,
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-information-outline", "Accompagnement", "#features"],
      ["mdi-download-box-outline", "Financement", "#download"],
      ["mdi-currency-usd", "Plans", "#pricing"],
      ["mdi-email-outline", "Contact", "#contact"],
    ],
    navItems : [
      { title: "Projet", route: "/form/project" },
      { title: "Profil", route: "/form/profile" },
      { title: "Auto-évaluation", route: "/form/reussir" },
      { title: "Financement", route: "/form/financement" },
      //{ title: "Merci", route: "/form/merci" },
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    isTabDisable(i) {
      return i > 1 && (typeof this.projectInfo == 'undefined' || this.projectInfo.termAndCondition == false)
    }
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  computed : {
    progressionModel : {
      get() {
        switch (this.$route.path) {
          case "/form/project":
            return 0;
          case "/form/profile":
            return 1;
          case "/form/reussir":
            return 2;
          default:
            return 3;
        }
      },
      set(newValue) {
        //prevent error ^^
      }
    }
  },
  meteor : {/*
    currentProject () {
      // You can also use Vue reactive data inside
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (this.projectInfo != myCurrentProjectInfo){
        this.projectInfo = myCurrentProjectInfo
        this.isCurrentProjectLoad = true;
      }
      return this.projectInfo
    }*/
  },
  mounted() {
    this.currentProjectId = this.$cookies.get("currentProjectId") ?? ''
    this.$subscribe('projects', [this.currentProjectId])
    this.$autorun((val)=> {
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      this.projectInfo = myCurrentProjectInfo
      this.isCurrentProjectLoad = true;
    })
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
