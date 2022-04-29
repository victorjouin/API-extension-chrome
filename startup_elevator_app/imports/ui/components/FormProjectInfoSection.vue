<template>
  <v-container fluid>
      <v-row justify="center" align="center">
          <v-col cols="11" class="py-0">
            <v-text-field ref="projectNameTextField" v-model="projectName" label="Nom de votre projet"/>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="11" class="py-0">
            <v-textarea ref="projectDescrTextArea" rows=4 v-model="projectDescription" label="Information(s) complémentaire(s) ..."/>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols=11 class="py-0">
            <v-btn
                color="#e0a141"
                dark
                block
                class="px-0 white-background"
                @click="submitInfo"
            >
                Continuer
            </v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        projectNameOldValue : {default : ''},
        projectDesciptionOldValue : {default : ''},
        progression : {default : 0}
    },
    data () {
        return {
            projectName : "",
            projectDescription : "",
        }
    },
    methods : {
        submitInfo() {
            this.$emit('emitSubmitProjectInfo', { title : this.projectName, description : this.projectDescription, termAndCondition : this.termAndConditionModel})
        }
    },
    watch : {
        progression() {
            if (this.progression == 8 ) {
                this.$refs['projectNameTextField'].focus()
            } else if (this.progression == 12 ) {
                this.$refs['projectDescrTextArea'].focus()
            }
        }
    },
    created() {
        this.projectName = this.projectNameOldValue
        this.projectDescription = this.projectDesciptionOldValue
    }


}
</script>

<style>

</style>