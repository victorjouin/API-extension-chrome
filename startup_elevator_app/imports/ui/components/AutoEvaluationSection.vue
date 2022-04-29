<template>
<section id="startproject">
  <v-container fluid style="background-color:transparent">
      <v-row justify="center" align="center" class="ma-0">
        <v-col :cols="isXs ? 12:8" :class="isXs ? '' :'pl-8'">
            <h1 class="font-weight-light display-2 text-h4 gray-text" style="color : #e0a141" v-html="componentData.title"></h1>
            <v-row class="mt-2">
                <h3 class="font-weight-light text-justify gray-text" v-html="componentData.textData">
                </h3>
            </v-row>
        </v-col>

        <v-col :cols="isXs? 12:4 " class="text-center">
            <v-img :src="componentData.imgPath" max-width="350px" />
        </v-col>
        <v-col cols=12>
            <v-row justify="center">
                <v-btn
                    color="#e0a141"
                    large
                    dark
                    class="mt-5 mb-4"
                    :block="isXs"
                    :to="{path : '/form/project'}"
                >
                    {{componentData.buttonText}}
                </v-btn>
            </v-row>
        </v-col>
      </v-row>
    </v-container>
</section>
</template>

<script>
export default {
    props: {
        yearsInCompany : {
            default : 5
        },
        isXs : { default : false},
        componentData : {
            default : function() {
                return {
                    title : "Evaluez vous-même la solidité de votre idée",
                    textData :"&nbsp; En 30 minutes auto-évaluez la viabilité de votre innovation.<br><br>&nbsp; Vous venez d'avoir une idée innovante d'app, de commerce . Vous n'osez pas contacter un incubateur, un développeur.                 <br>&nbsp; Vous vous demandez par où commencer ?<br>&nbsp; Laissez-vous guider et évaluez vous-même les chances de réussite de votre projet.<br>&nbsp; Une fois votre projet validé, n'hésitez pas à nous solliciter pour un accompagnement plus poussé.",
                    imgPath : "/assets/img/evaluation-projet-innovant-startup-elevator.webp",
                    buttonText : "J'évalue mon idée en 30 min"
                }
            }
        }
    },
}
</script>

<style scoped>
/*
#startproject {
    background-color: #676767;
}
*/
.gray-text {
    color:black;
}
</style>