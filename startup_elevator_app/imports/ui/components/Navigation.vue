<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      color="primary"
    >
    <v-row class="ma-0" :class="{ logo_drawer: flat }" justify="center" style="background-color : #FFFFFF;">
      <v-img style="max-width : 200px" src="/assets/img/logo.svg" alt="Logo" contain/>
    </v-row>

     
      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link); drawer = false"
        >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="color"
      :flat="flat"
      block
      dark
      :class="{ expand: flat }"
    >
      <v-row align="center" align-content="center">
        <v-img src="/assets/img/logo.svg" max-width="200px" rad contain/>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              color="grey"
              class="mr-4"
              v-if="isXs"
            />
            <div v-else>
              <v-btn text color="primary" @click="$vuetify.goTo('#hero')">
                <span class="mr-2">Accueil</span>
              </v-btn>
              <v-btn text color="primary" @click="$vuetify.goTo('#about')">
                <span class="mr-2">Accompagnement</span>
              </v-btn>
              <v-btn text color="primary" @click="$vuetify.goTo('#download')">
                <span class="mr-2">Financement</span>
              </v-btn>
              <v-btn text color="primary" @click="$vuetify.goTo('#pricing')">
                <span class="mr-2">Offre</span>
              </v-btn>
              <v-btn color="primary" outlined text @click="$vuetify.goTo('#contact')">
                <span class="mr-2">Contact</span>
              </v-btn>
            </div>
        </v-toolbar-items>
      </v-row>
    </v-app-bar>
  </div>
</template>

<style lang="scss">
.v-toolbar__content {
  height: 100% !important;
}

</style>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
}

.logo_drawer {
  height: 80px;
}
</style>

<script>
export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home-outline", "Accueil", "#hero"],
      ["mdi-information-outline", "Accompagnement", "#about"],
      ["mdi-download-box-outline", "Financement", "#download"],
      ["mdi-currency-usd", "Offres", "#pricing"],
      ["mdi-email-outline", "Contact", "#contact"],
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
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
