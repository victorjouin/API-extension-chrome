<template>
<section id="startproject">
<v-parallax src="/assets/img/bghero1.webp" height="fit-content" class="ma-0 pa-0" >
  <v-container fluid>
      <v-row justify="center" class="ma-0">
    <v-col :cols="isXs ? 12 : 10">
            <h1 class="font-weight-light display-2 text-h4 mb-3 gray-text" style="color : #e0a141">Démarrez votre projet</h1>
        <v-row>
            <h3 class="font-weight-light text-justify gray-text">
                &nbsp; Auto-évaluer la viabilité de votre innovation
                Laissez-vous guider par notre plateforme, pour vous poser les bonnes questions et évaluer vous-même les chances de réussite de votre projet.
                <br>
                Démarrez votre accompagnement avec votre expert Startup Elevator. Décrivez nous votre projet, il sera communiqué de façon confidentielle à un expert référent.
            </h3>
        </v-row>
        <v-row justify="center" >
            <h1 class="font-weight-light my-2 text-center gray-text">
                Budget financé prévisionnel : <span class="display-1">{{ yearsInCompany * 500 }} €</span>
            </h1>
        </v-row>
        <v-row justify="center">
            <v-btn
                color="#e0a141"
                large
                dark
                class="mt-5"
                :block="isXs"
                :to="{path : '/form/project'}"
            >
                Démarrer mon projet
            </v-btn>
        </v-row>
    </v-col>
      </v-row>
    </v-container>
      </v-parallax>
</section>
</template>

<script>
export default {
    props: {
        yearsInCompany : {
            default : 5
        },
        isXs : { default : false}
    },
}
</script>

<style scoped>
#startproject {
    background-color: #616161;
}

.gray-text {
    color:white;
}
</style>