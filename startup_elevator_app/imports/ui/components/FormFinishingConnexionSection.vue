<template>
<v-container fluid>

  <v-row justify="center" align="center">
          <v-col cols="12">
              <h2 class="font-weight-light" style="color:#e0a141">
                  Nous avons enregistré les informations de base de votre projet.
              </h2>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="12">
              <h4 class="font-weight-light" >
                  Faire évoluer votre projet avec votre expert Startup Elevator vous prendra quelques mois.
Nous vous recommandons de vous connecter à la plateforme, pour pouvoir travailler sur votre projet facilement.
              </h4>
          </v-col>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="12">
              <h3 class="font-weight-light" style="color:#e0a141">
                  Vous allez maintenant être guidé dans le financement de votre projet.
              </h3>
          </v-col>
      </v-row>
      <v-row justify="space-around" align="center">
          <v-col cols="6">
              <v-btn 
                color="primary"
                outlined
                block
                :to="{ path: '/form/financement'}"
              >
              <v-icon>
                  mdi-network-strength-off-outline
              </v-icon>
                &nbsp;Sans connexion
              </v-btn>
          </v-col>
          <v-col cols="6">
              <v-btn 
                color="primary"
                block
                :to="{ path: '/form/financement'}"
              >
                <v-icon>mdi-account-circle</v-icon>&nbsp; Connexion
              </v-btn>
          </v-col>
      </v-row>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>