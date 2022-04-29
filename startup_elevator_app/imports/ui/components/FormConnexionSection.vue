<template>
  <v-container fluid>
      <v-row justify="start" align="center">
          <div class="font-weight-thin text-p" style="font-size : small">
            &nbsp;Vous pouvez aussi choisir de <span @click="$vuetify.goTo('#termAndConditionCheckbox')"><U>continuer</U></span> de façon anonyme.
          </div>
      </v-row>
      <v-row justify="space-around" align="center">
          <v-col cols="12">
              <v-text-field @blur="submitUserInfo" v-model="userLastName" placeholder="Nom et Prénom">

              </v-text-field>
          </v-col><!--
          <v-col cols="6">
              <v-text-field @blur="submitUserInfo" v-model="userFirstName" placeholder="Prénom">
              </v-text-field>
          </v-col>-->
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="12">
              <v-text-field @blur="submitUserInfo" v-model="userMail" placeholder="Email">
              </v-text-field>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="12">
              <v-text-field @blur="submitUserInfo" type="number" v-model="userTel" placeholder="Téléphone">
              </v-text-field>
          </v-col>
      </v-row>


      <v-row class="mb-4" justify="center" align="center" id="termAndConditionCheckbox">
          <v-col cols="8" class="py-0" align-self="center">
            <v-checkbox @click="submitUserInfo" class="ma-0 pa-0 " style="border-style: solid; border-width: thin; border-radius: 4px; border-color : orange" v-model="termAndConditionModel" @change="isUserTryingToByPassTermAndCondition = !termAndConditionModel" hide-details :style="`${isUserTryingToByPassTermAndCondition ? 'border-style: solid; border-width: thin; border-radius: 4px;border-color : red' : ''}`">
                <template v-slot:label>
                    <p class="font-weight-thin ma-1" :style="'font-size : small; color : '+(isUserTryingToByPassTermAndCondition ? 'red': 'black')">J'ai lu et j'accepte les <b>Termes et Conditions</b> et <b>la Politique de confidentialité</b><span style="color: #e0a141; font-size:large">*</span></p>
                </template>
            </v-checkbox>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
            <v-btn @click="submitUserInfoAndGoToFinancement" color="primary">
                Faire mon auto-évaluation
            </v-btn>
      </v-row>
    <v-row v-if="!termAndConditionModel" justify="center" align="center">
        <v-col cols=11 class="py-0">
            <p class="font-weight-thin ma-0 text-center" style="font-size : 10px; color : red">Veuillez accepter les <b>Termes et Conditions et la Politique de confidentialité</b> avant de continuer</p>
        </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
    props : {
        oldUserInfo : {
            default : {
                userFirstName : '',
                userLastName : '',
                userMail : '',
                userTel : '',
                userSituation : '',
                termAndCondition : {default : false},
            }
        }
    },
    data () {
        return {
            userFirstName : this.oldUserInfo.userFirstName,
            userLastName : this.oldUserInfo.userLastName,
            userMail : this.oldUserInfo.userMail,
            userTel : this.oldUserInfo.userTel,
            userSituation : this.oldUserInfo.userSituation,
            termAndConditionModel : this.oldUserInfo.termAndCondition,
            situations : [
                "Etudiant",
                "Salarié",
                "PDG",
                "Auto-entrepreneur",
                "Autre"
            ],
            isUserTryingToByPassTermAndCondition : false,
        }
    },
    mounted() {
    },
    methods: {
        submitUserInfo() {
            this.$emit('emitUserInfoSubmited', 
                {
                    userFirstName : this.userFirstName ?? '',
                    userLastName : this.userLastName ?? '',        
                    userMail : this.userMail ?? '',
                    userTel : this.userTel ?? '',
                    userSituation : this.userSituation ?? '',
                    termAndCondition : this.termAndConditionModel,
                }
            )
        },
        submitUserInfoAndGoToFinancement() {
            if (this.termAndConditionModel) {
                this.$emit('emitUserInfoSubmited', 
                    {
                        userFirstName : this.userFirstName ?? '',
                        userLastName : this.userLastName ?? '',        
                        userMail : this.userMail ?? '',
                        userTel : this.userTel ?? '',
                        userSituation : this.userSituation ?? '',
                        termAndCondition : this.termAndConditionModel,
                    }
                )
                this.$router.push({path :'/form/reussir'})
            } else {
                this.isUserTryingToByPassTermAndCondition = true
                alert("Veuillez accepter nos termes et conditions pour continuer")
            }
        }
    },
    watch : {
        oldUserInfo(value){
            this.userFirstName = value.userFirstName
            this.userLastName = value.userLastName
            this.userMail = value.userMail
            this.userTel = value.userTel
            this.userSituation = value.userSituation
            this.termAndConditionModel = value.termAndCondition
            this.isUserTryingToByPassTermAndCondition = value.termAndCondition || false
        }
    }

}
</script>

<style>

</style>