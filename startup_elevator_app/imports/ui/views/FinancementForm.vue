<template>
<section style="height: 100%;width: 100%; margin-bottom: 56px" >
    <v-container v-if="financementInfo.termAndCondition || !isCurrentProjectLoad" fluid style="height: 100%;" :style="isXs ? 'width: 100%' : 'width: 70%'">
      <v-row justify="center" align="center" class="my-1">
          <div class="font-weight-light" :class="isXs ? 'text-h4' : 'text-h3'" style="color : #e0a141">Financement de votre projet {{financementInfo.title != "" ? `: ${financementInfo.title}` : ''}}</div>
      </v-row>
      <v-row justify="start" align="center">
          <div class="font-weight-thin text-p" style="font-size : small">
            &nbsp;Vous pouvez <span @click="$router.push({path : '/form/reussir'})"><U>continuer</U></span> vers l'auto-évaluation directement.
          </div>
      </v-row>

      <v-row class="my-3">
        <v-divider class="my-1"></v-divider>  
      </v-row>
        <!--
            -->
    <v-row style="maring-bottom : 5vh" justify="center" align="center">
        <v-col cols="12">
            <v-list v-for="(question, index) in questions" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :title="question.title"
                                :type="question.type"
                                :textFieldPrefix="question.textFieldPrefix"
                                :textFieldSuffix="question.textFieldSuffix"
                                :questionTitle="question.questionTitle"
                                :questionItems="question.questionItems"
                                :descriptionItems="question.descriptionItems"
                                :initialValue="question.initialValue"
                                @emitUserAnswered="userAnswered($event, index)"
                            />
                </v-row>
                <v-row v-if="index < questions.length - 1">
                        <v-divider class="my-1"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>
<!--
      <v-row justify="space-around" align="center">
        <v-col cols="5" class="text-center">
            <h3 class="font-weight-light">
                Situation
            </h3>
        </v-col>
        <v-col cols="7" class="text-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    max-width="100%"
                    color="primary"
                    dark
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    >
                    {{userSituation != '' && userSituation != undefined ? userSituation : 'Séléctionner ici'}}
                    &nbsp;<v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(situation, index) in situations"
                        :key="index"
                        @click="userSituation = situation;submitUserInfo()"
                    >
                    <v-list-item-title>{{ situation }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-col>
      </v-row>
      -->

    <v-row justify="center" align="center">
        <v-btn @click="submitFinancementInfo" color="primary">
            Terminer
        </v-btn>
    </v-row>
    </v-container>
        <v-dialog
      v-model="isUserFinishedForm"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
          >{{endPopup.title}}</v-toolbar>
          <v-card-text>
            <div class="text-h4 py-8 px-4">{{endPopup.descr}}</div>
            <v-img
              src="https://media.giphy.com/media/gDJmXmtODz16M/giphy.gif"
              :width="isXs ? '100%' : '80%'"
              style="border-radius : 5px"
              :style="isXs ? '' : 'left : 10%'"
              aspect-ratio="1"
              height="auto"
            >
            </v-img>
            <!--
            <div :style="isXs ? 'width:100%' : 'width:80%;left:10%'" style="height:0;padding-bottom:113%;position:relative;"><iframe src="https://giphy.com/embed/gDJmXmtODz16M" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cosplay-costume-rocket-gDJmXmtODz16M">via GIPHY</a></p>
            <div>
              <iframe src="https://giphy.com/embed/gDJmXmtODz16M" width="90%" height="auto" frameBorder="0" class="giphy-embed"></iframe><p><a href="https://giphy.com/gifs/cosplay-costume-rocket-gDJmXmtODz16M">via GIPHY</a></p>
            </div>
            -->
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="primary"
              text
              @click="dialog.value = false; isUserFinishedForm = false"
            >{{endPopup.closeButton}}</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</section>
</template>

<script>
import FormQuestionModule from '../components/FormQuestionModule.vue';
import Projects from '../../api/collections/Projects'

export default {
  components: {
    FormQuestionModule 
  },
  data() {
    return {
      isXs : false,
      //question projet
      isCurrentProjectLoad : false,
      wannaDoTitle : "Que souhaitez-vous créer ?",
      questions : [ 
        {   
          type: 'dropdown',
          questionTitle : "Vous avez trois solutions pour financer cet accompagnement",
          questionItems : [
              "Je ne sais pas",
              "Fonds propres",
              "Financement Compte Personnel de Formation – CPF",
              "Financement OPCO",
              "Financement formation pole emploi"
              ],
          descriptionItems : [
              "",
              "",
              "<span>&nbsp;Vous êtes ou avez été salarié(e) ? Ou dirigeant(e) d’entreprise ? Bonne nouvelle, vous bénéficiez d’un compte CPF. Mais de quoi s’agit-il ? De votre Compte Personnel de Formation. Alimenté en euros, il est là pour financer vos formations et développer vos compétences.<br>Pour confirmer votre solde réel de formation, vous devez vous connecter sur le site officiel de l’état Francais : www.moncompteformation.gouv.fr.<br>Budget de formation indiqué sur votre compte CPF : <a href='https://www.moncompteformation.gouv.fr/espace-prive/html/#/compte-utilisateur/connexion' target='_blank'>Accès à votre compte</a></span>",
              //<v-row><v-col cols='12'><img style='max-width : 80%' src='/assets/img/formationAccountConnectionCPF.png'></img></v-col></v-row>
              "Vous devez négocier avec votre patron pour utiliser le budget de formation OPCO de votre entreprise. Si le projet est en relation avec votre entreprise, votre patron est susceptible de le financer au travers de l’OPCO.",
              "Votre pole emploi peut financer votre création d’entreprise et donc la formation Startup Elevator. Vous pouvez prendre contact avec votre conseillé pole emploi, pour confirmer votre projet professionnel."
          ],
          initialValue :''
        },
        {   
          type: 'textfield',
          title : "Confirmation du Financement de votre formation",
          questionTitle : "<span>Après votre prise de contact avec votre OPCO, CPF ou Pole emploi, merci de confirmer le budget prévisionnel pour cette formation.</span>",
          textFieldPrefix : "Financement prévisionel",
          textFieldSuffix : "€",
          descriptionItems : [
            ],
          initialValue :''
        },
      ],

      //progrssion : 0->12
      progression : 0,


      //projectinfo
      financementInfo : {
        financementOption : '',
        previsionalFinancement : '',
        termAndCondition : false
      },

      //end popup
      endPopup : {
        title : "MERCI",
        descr : "Votre projet est lancé !",
        closeButton : "Fermer"
      },

      isUserFinishedForm : false,
    
    }
  },
  methods : {
    onResize() {
        this.isXs = window.outerWidth < 850;
    },
    submitFinancementInfo() {
        //todo : upddate bd
        //this.$router.push({ path : '/form/reussir'})

        this.isUserFinishedForm = true
    },
    userAnswered(answer, questionIndex){
        switch (questionIndex) {
          case 0:
            this.financementInfo.financementOption = answer
            break;
          case 1:
            this.financementInfo.previsionalFinancement = answer
            break;
          default:
            break;
        }
        if (this.currentProjectId !='') {
            Meteor.call('updateProjectFinancementInfoById', 
                this.currentProjectId, 
                {
                    financementOption : this.financementInfo.financementOption,
                    previsionalFinancement : this.financementInfo.previsionalFinancement
                }, 
                (error) => {
                    if (!error){
                        this.isCurrentProjectLoad = false
                    } else {
                        console.log(error);
                    }
                }
            )
        }
    },
    goBack() {
        switch (this.progression) {
            case 6:
                this.progression = 0
                break;
            default:
                this.progression = 0
                break;
        }
        this.$router.push({path :'/form/profile'})
    },
    goNext() {
        this.$router.push({path :'/form/reussir'})
    }
  },
  meteor : {/*
    currentProject () {
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (!this.isCurrentProjectLoad && myCurrentProjectInfo && this.financementInfo.financementOption != myCurrentProjectInfo.financementOption){
        this.financementInfo = myCurrentProjectInfo
        this.financementInfo.financementOption = myCurrentProjectInfo.financementOption
        this.questions[0].initialValue = this.financementInfo.financementOption
        this.financementInfo.previsionalFinancement = myCurrentProjectInfo.previsionalFinancement
        this.questions[1].initialValue = this.financementInfo.previsionalFinancement
        this.isCurrentProjectLoad = true;
      }
      return this.financementInfo
    }*/
  },
  mounted() {
    this.$vuetify.goTo(0);

    this.currentProjectId = this.$cookies.get("currentProjectId") ?? ''
    this.$subscribe('projects', [this.currentProjectId])
    this.$autorun((val) => {
      this.isCurrentProjectLoad = false
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (myCurrentProjectInfo) {
        this.financementInfo = myCurrentProjectInfo
        this.financementInfo.financementOption = myCurrentProjectInfo.financementOption
        this.questions[0].initialValue = this.financementInfo.financementOption
        this.financementInfo.previsionalFinancement = myCurrentProjectInfo.previsionalFinancement
        this.questions[1].initialValue = this.financementInfo.previsionalFinancement
        this.isCurrentProjectLoad = true;
      }

    })
    
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  updated() {
    this.onResize();
  }
}
</script>

<style>
.white-background {
  background-color: white;
}
</style>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition : opacity .5s, transform 1s;
}
.fade-leave-active {
  display: none;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

</style>
<style lang="scss" scoped>
  h4 {
    font-size: 6rem;
    font-weight: lighter;
    span.cursor {
      display: inline-block;
      margin-left: 3px;
      width: 4px;
      background-color: #fff;
      animation: cursorBlink 1s infinite;
    }
    span.cursor.typing {
      animation: none;
    }
  }
  @keyframes cursorBlink {
    49% { background-color: #e0a141; }
    50% { background-color: transparent; }
    99% { background-color: transparent; }
  }
</style>