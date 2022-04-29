<template>
<section id="startproject">
<v-parallax src="/assets/img/bgProgression.webp" height="fit-content" class="ma-0 pa-0 gray-background-filter">
  <v-container fluid>
    <v-row justify="center" class="ma-0">
    <v-col :cols="isXs ? 12 : 10">
        <h1 class="font-weight-light display-2 text-h4 gray-text" style="color : #e0a141" v-html="componentData.title"></h1>
        <v-row class="mt-3">
            <h3 class="font-weight-light text-justify gray-text" v-html="componentData.subtitle">
                
            </h3>
        </v-row>

        <v-row justify="center" >
            <v-col :cols="isXs ? 12 : 8">

                <v-timeline
                    :dense="isXs"
                >
                    <v-timeline-item
                    v-for="(n, index) in componentData.steps"
                    :key="index"
                    color="primary"
                    large
                    >
                    <template v-slot:opposite>
                        <span>{{n.title}}</span>
                    </template>
                    <v-card class="elevation-2">
                        <v-card-title class="text-h5" :style="'word-break : break-word; color : '+$route.meta.toolbarColor">
                            {{ n.title }}
                        </v-card-title>
                        <v-card-text>
                            &nbsp;{{ n.text}}
                        </v-card-text>
                        <v-card-actions class="text-right" v-if="n.buttonText != undefined">
                            <v-row justify="end" no-gutters>
                                <v-col cols="6">
                                    <v-btn
                                        class="px-0"
                                        color="primary"
                                        block
                                        :to="{ path:'/form/project'}"
                                        >
                                        {{n.buttonText}}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
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
        isXs : { default : false},
        componentData : {
            default : function() {
                return {
                    title : "Les étapes de votre projet",
                    subtitle :"&nbsp;Partenaire des entrepreneurs en France, Startup Elevator propose un accompagnement complet qui permet de réussir votre projet digital, il se décompose en quatre étapes :",
                    steps: [
                        {
                            title: 'Définir son projet et le challenger avec un Expert',
                            text: "L’évènement original : gratuit, ouvert à tous et organisé tous les trimestres. Vous confrontez votre idée, vous vous faites challenger par des experts et obtenez un maximum de feedbacks sur votre projet. Commencer dès aujourd'hui par une auto-évaluation en ligne.",
                            buttonText: "Je m'inscris",
                        },
                        {
                            title: 'Rencontrez votre binôme',
                            text: "Innover seul n'est jamais une bonne idée! Choisissez votre binome par affinitée dans votre région. Affinez et mettez en pratique vos idées en collaborant avec un autre innovateur.",
                            buttonText: undefined,
                        },
                        {
                            title: 'Designer un service utile à vos utilisateurs',
                            text: "Notre équipe d’experts vous accompagne ‘hors des sentiers battus’ dans la création de services & produits digitaux innovants.",
                            buttonText: undefined,
                        },
                        {
                            title: 'Lancer son App !',
                            text: "Créons un prototype POC et testons le avec des utilisateurs cibles, pour confirmer l'adéquation de votre produit avec les besoins du marché.",
                            buttonText: undefined,
                        },
                    ],
                }
            }
        }
    },
    data() {
        return {
            progression: 0,
            ticksLabels: [
                'Crash Test',
                'Recontrez votre binôme',
                'Designer un service utile a vos utilisateurs',
                'Lancer son service / App',
            ],
            
        }
    }
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