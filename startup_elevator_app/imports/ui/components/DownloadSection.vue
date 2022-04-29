<template>
  <section id="download">
    <v-container fluid style="background-color:#e0a141">
      <v-row justify="center" class="ma-0">
        <v-col :cols="isXs ? 12 : 10">
          <v-row align="center" justify="center" class="white--text">
            <v-col sm="4" class="hidden-xs-only">
              <v-img src="/assets/img/ill2.svg" class="d-block ml-auto mr-3" max-width="350px" />
            </v-col>
            <v-col sm="8">
                  <h1 class="font-weight-light display-2 text-h4 my-4" v-html="componentData.title"></h1>
              <v-row>
                <h3 class="font-weight-light" v-html="componentData.subtitle">

                </h3>
              </v-row>
              <v-row justify="center">
                <h1 class="font-weight-light text-center display-1 my-2"><b>{{ estimatedBudget }}€</b> de financement</h1>
              </v-row>
              <v-row justify="center">
                <h3 class="font-weight-light" v-html="componentData.buttonSelectionDescription">
                  
                </h3>
              </v-row>
              <v-row justify="space-between" :key="buttonKey" class="my-4">
                <v-col :cols="isButtonSelected[0] ? 3 : 2" class="pa-0">
                  <v-btn block large @click="yearSelected(0)" :outlined="!isButtonSelected[0]" color="white">
                    3 {{ isButtonSelected[0] ? "ans" : "" }}
                  </v-btn>
                </v-col>
                <v-col :cols="isButtonSelected[1] ? 3 : 2" class="pa-0">
                  <v-btn block large @click="yearSelected(1)" :outlined="!isButtonSelected[1]" color="white">
                    4 {{ isButtonSelected[1] ? "ans" : "" }}
                  </v-btn>
                </v-col>
                <v-col :cols="isButtonSelected[2] ? 3 : 2" class="pa-0">
                  <v-btn block large @click="yearSelected(2)" :outlined="!isButtonSelected[2]" color="white">
                    5 {{ isButtonSelected[2] ? "ans" : "" }}
                  </v-btn>
                </v-col>
                <v-col :cols="isButtonSelected[3] ? 3 : 2" class="pa-0">
                  <v-btn block large @click="yearSelected(3)" :outlined="!isButtonSelected[3]" color="white">
                    6 {{ isButtonSelected[3] ? "ans" : "" }}
                  </v-btn>
                </v-col>
                <v-col :cols="isButtonSelected[4] ? 3 : 2" class="pa-0">
                  <v-btn block large @click="yearSelected(4)" :outlined="!isButtonSelected[4]" color="white">
                    +7 {{ isButtonSelected[4] ? "ans" : "" }}
                  </v-btn>
                </v-col>
              </v-row>
              
            </v-col>
          </v-row>
        </v-col>
          </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#download {
  /*
  background-image: url("/assets/img/bgDownload.webp");
  background-color: #e0a161;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  */
  height: fit-content;
}

#download .container,
#download .row {
  height: 100%;
}
</style>

<script>
export default {
  props: {
    isXs: {default : false},
    componentData : {
      default : function() {
        return {
          title : "Un financement simple de votre projet",
          subtitle :"&nbsp; Votre expert Startup Elevator vous accompagne pour obtenir votre financement.",
          buttonSelectionDescription : "&nbsp; Estimation de vos droits à la formation réalisée à partir de vos années de travail en entreprise :"
        }
      }
    }
  },
  data() {
    return {
      buttonKey : 0,
      isButtonSelected :[false, false, true, false, false],
      estimatedBudget : 2500
    }
  },
  methods : {
    yearSelected(buttonId) {
      this.isButtonSelected.fill(false, 0, 5)
      this.estimatedBudget = (buttonId + 3) * 500
      this.$emit('yearInCompanySelected', buttonId + 3) 
      this.isButtonSelected[buttonId] = true
      this.buttonKey++
    }
  }

  
}
</script>