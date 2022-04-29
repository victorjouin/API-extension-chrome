<template>
  <section id="pricing" class="pb-8">
    <v-container fluid>
      <v-row class="ma-0" justify="center">
        <v-col :cols="isXs ? 12 : 10">
            <h1 class="font-weight-light display-2 text-h4 mt-2 mb-0" style="color : #e0a141" v-html="componentData.title"></h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col :cols="isXs ? 12 : 10">
            <v-row class="text-center">
              <v-col v-for="(offer, offersIndex) in componentData.offers" :key="offersIndex" class="col-12 col-md-4" :class="offersIndex < componentData.offers.length - 1 ? 'col-sm-6' : ''">
                <v-card elevation="3" height="100%">
                  <v-card-text style="height:100%">
                    <v-layout column justify-space-between fill-height>
                    <div>
                    <v-row class="my-1" justify="center" align="center">
                      <div class="circle1">
                        <div class="circle2">
                          <v-img :src="offer.img"></v-img>
                        </div>
                      </div>
                    </v-row>
                    <v-row class="my-1" justify="center" align="center">
                      <div class="my-2">
                        <span class="text--disabled text-uppercase text-h5 description_text" v-html="offer.name+' -'"></span>
                        <span class="text-uppercase text-h5 mt-6 description_text_orange font-weight-bold" v-html="offer.duration"></span>
                      </div>
                    </v-row>
                    <v-divider class="my-2" style="border-top-color : #616161"/>
                    <div  v-for="(feature, index) in offer.features" :key="index">
                      <v-row class="my-1" justify="center" align="center">
                        <div class="text-uppercase description_text" v-html="feature"></div>
                      </v-row>
                      <v-divider v-if="index < offer.features.length - 1" class="my-2"/>
                    </div>
                    <v-divider class="mt-2 mb-4" style="border-top-color : #616161"/>

                    <v-row class="my-1" justify="center" align="center">
                      <div class="text-uppercase description_text mb-2 text-h6 description_text_orange">Financement</div>
                    </v-row>
                    <v-row align="center" no-gutters>
                      <v-col class="ml-4 description_text" style="text-align : start">
                          Prix initial
                      </v-col>
                      <v-col class="mr-4 description_text" style="text-align : end">
                          {{offer.initialPrice}},00 €
                      </v-col>
                    </v-row>
                    <v-row align="center" no-gutters>
                      <v-col class="ml-4 description_text" style="text-align : start">
                          Financement
                      </v-col>
                      <v-col class="mr-4 description_text" style="text-align : end">
                          - {{ 500 * yearsInCompany}},00 €
                      </v-col>
                    </v-row>
                    <v-divider class="ml-6 mr-8"></v-divider>
                    <v-row align="center" no-gutters>
                      <v-col class="ml-4 description_text" style="text-align : start">
                          Reste à payer
                      </v-col>
                      <v-col class="mr-4 text-h6 description_text_orange" style="text-align : end">
                          = {{ offer.initialPrice - 500 * yearsInCompany > 0 ? offer.initialPrice - 500 * yearsInCompany : 0 }},00 €
                      </v-col>
                    </v-row>
                    </div>
                    <div>

                    <v-btn
                        v-bind="size"
                        block
                        outlined
                        color="primary"
                        class="mt-6"
                        :to="{path : '/form/project'}"
                    >
                      {{componentData.buttonText}}
                    </v-btn>
                    </div>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!--
    <div class="svg-border-rounded text-light">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 144.54 17.34"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path
          d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"
        />
      </svg> 
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
      >
        <path
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
      -->
  </section>
</template>

<script>
export default {
  props: {
    yearsInCompany : {
      default : 3
    },
    isXs : { default : false},
    componentData : {
      default : function() {
        return {
          title : "Nos Offres",
          offers : [
            { 
              name : "START",
              duration : "7h",
              img : "/assets/img/paperplane.svg",
              features : [
                "Organiser la connaissance du service/app",
                "Confronter votre vision aux experts du terrain",
                "Capturer les problématiques clients",
                "Lister les raisons d’échec de votre projet",
                "Trouver les concordances entre les objectifs de vos clients et de votre d’entreprise",
              ],
              initialPrice : 1440,
            },
            { 
              name : "BOOST",
              duration : "14h",
              img: "/assets/img/airplane.svg",
              features : [
                "Option START",
                "Organiser vos innovations préexistantes",
                "Générer de nouvelles idées liées aux problématiques clients",
                "Réaliser le story-board de la solution",
              ],
              initialPrice : 2400,
            },
            { 
              name : "ACCELERATION",
              duration : "18h",
              img :"/assets/img/aeroplane.svg",
              features : [
                "Option BOOST",
                "Réaliser le story-board de la solution qui maximise les chances de réussite",
                "Les besoins pour créer une App",
                "Creer son prototype / POC",
                "Tester son POC"
              ],
              initialPrice : 3200,
            },

          ],
          buttonText : "Choisir"
        }
      }
    }
  },
  computed: {
    size() {
      const size = {md: "large", xl: "x-large"}[
          this.$vuetify.breakpoint.name
          ];
      return size ? {[size]: true} : {};
    },
    calculatedBudget(startPrice){
      return startPrice - 500 * yearsInCompany > 0 ? startPrice - 500 * yearsInCompany : 0
    }
  }
};
</script>

<style lang="scss">
$main_color: #616161;

ul {
  font-size: 13px;
  line-height: 1.5em;
  margin: 5px 0 15px;
  padding: 0;

  li {
    list-style: none;
    position: relative;
    padding: 0 0 0 20px;
  }

  li {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 5px;
      width: 10px;
      height: 10px;
      background-color: $main_color;
      border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-eeborder-radius: 50%;
    }
  }
}
</style>

<style scoped>
.header {
  background-color: #283e79;
  color: white;
}

.circle1 {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background-color: #e0a14117;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle2 {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #e0a1411f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-border-rounded svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #f4f7f5;
  z-index: -1;
}

.description_text {
  color: #616161;
}
.description_text_orange {
  color: #e0a141;
}

#pricing {
  z-index: 0;
}

.content {
  z-index: 1;
}

svg {
  overflow: hidden;
}

section {
  position: relative;
}


</style>
