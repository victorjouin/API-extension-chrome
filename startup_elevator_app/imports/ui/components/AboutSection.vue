<template>
  <section id="about">
    <v-container fluid>
      <v-row class="ma-0" align="center" justify="center">
            <v-col :cols="isXs ? 12 : 10">
              <h1 class="font-weight-light display-2 text-h4 mb-3" style="color : #e0a141" v-html="componentData.title"></h1>
              <v-row>
                <v-col cols=12 class="d-flex align-center" style="padding-inline:0">
                  <v-icon 
                    dense 
                    x-large
                    style="color:#e0a141"
                    max-width="60px"
                    class="mr-4"
                  >{{componentData.firstPartIcon}}
                  </v-icon>
                  <p class="text-justify" v-html="componentData.firstPartHtml">
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center" style="padding-inline:0">
                  <v-icon 
                    dense 
                    x-large
                    style="color:#e0a141"
                    max-width="60px"
                    class="mr-4"
                  >{{componentData.secondPartIcon}}
                  </v-icon>
                  <p class="text-justify" v-html="componentData.secondPartHtml">
                    
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex" align-self="center" style="padding-inline:0">
                  <v-icon 
                    dense 
                    x-large
                    style="color:#e0a141"
                    max-width="60px"
                    class="mr-4"
                  >{{componentData.thirdPartIcon}}
                  </v-icon>
                  <p class="text-justify mb-0" v-html="componentData.thirdPartHtml">
                    
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#about {
  background-color: #f4f7f5;
}
</style>

<script>
export default {
  props: {
    isXs: {default : false},
    componentData : {
      default : function() {
        return {
          title : "Accompagnement de projet innovant",
          firstPartIcon :"mdi-rocket-launch-outline",
          firstPartHtml :"&nbsp;Pour démarrer votre projet, vous avez besoin de Développeurs, Designers, Marketeurs digitaux, et surtout d’un marché !",
          secondPartIcon :"mdi-account-tie",
          secondPartHtml :"&nbsp;Startup Elevator vous accompagne dans toutes ces étapes. Nos experts accompagnent votre entreprise en création dans de multiples domaines : e- commerce, commerce physique, e-santé, Fin Tech, Green Tech, SporTech, IA & Big Data.",
          thirdPartIcon :"mdi-auto-fix",
          thirdPartHtml :"&nbsp;Bénéficiez des meilleurs experts de la Tech, pour améliorer votre business-modèle grâce à une méthode d’innovation révolutionnaire : le design thinking. L’accompagnement est fait pour moitié de tutorat personnel et d’ateliers en groupe.",
        }
      }
    }
  },
}
</script>