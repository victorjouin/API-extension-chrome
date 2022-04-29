<template>
  <v-container fluid class="mx-0">
      <v-row justify="center">
        <div class="font-weight-light display-2 text-h5 my-2" style="color : #616161">{{questionTitle}}</div>
      </v-row>
      <v-row v-for="i in buttonsHalfLength" :key="i" justify="space-between" dense>
        <v-col cols="6" class="text-center">
            <v-btn
                color="#e0a141"
                dark
                block
                class="text-capitalize white-background px-0"
                @click="buttonSelected(i - 1)"
              >
                {{ buttons[i - 1].textButton }}
              </v-btn>
        </v-col>
        <v-col cols="6" class="text-center">
            <v-btn
                color="primary"
                dark
                block
                class="text-capitalize px-0 white-background"
                @click="buttonSelected(i + buttonsHalfLength - 1)"
              >
                {{ buttons[i + buttonsHalfLength - 1 ].textButton }}
              </v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  props : {
    buttons : { default : [ 
        { 
          textButton : "App mobile",
          descrText : "une application mobile"   
        },
        { 
          textButton : "Site web",
          descrText : "un site web"   
        },
        { 
          textButton : "Mon entreprise",
          descrText : "mon entreprise"   
        },
        { 
          textButton : "Un service",
          descrText : "un service"   
        },
        { 
          textButton : "Un commerce physique",
          descrText : "un commerce physique"   
        },
        { 
          textButton : "un concept innovant",
          descrText : "un concept innovant"  
        },
      ]
    },
    questionTitle : { default : "Que souhaitez-vous"},
    emitReference : { default : ""},
    isXs : { default : false}
  },
    computed : {
        buttonsHalfLength() {
            return this.buttons.length / 2
        }
    },
    methods: {
        buttonSelected(index) {
          this.$emit(this.emitReference, this.buttons[index].descrText)
        }
    },
    
}
</script>
