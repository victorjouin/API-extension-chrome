<template>
  <section style="height: 100%;width: 100%;margin-bottom: 56px" >
    <v-container fluid style="height: 100%;">
      <v-row justify="center" align="center">
          <div class="font-weight-light" :class="isXs ? 'text-h4' : 'text-h3'" style="color : #e0a141">Merci d'avoir compléter le questionnaire</div>
      </v-row>

      <v-row class="mx-2" justify="center">
          <h3 class="font-weight-light mt-2" >
            Nous espérons vous avoir aidé à clarifier votre projet !
          </h3>
      </v-row>

      
    </v-container>
  </section>
</template>

<script>
export default {
    data() {
        return {
            isXs : true
        }
    },

    mounted() {
        this.$vuetify.goTo(0)

        this.onResize();
        window.addEventListener("resize", this.onResize, { passive: true });
    },
    methods : {
        onResize() {
            this.isXs = window.outerWidth < 850;
        }
    }
}
</script>

<style>

</style>