<template>
<section ref="succeedForm" style="height: 100%;width: 100%;margin-bottom: 56px" >
    <v-container v-if="succeedInfo.termAndCondition && isCurrentProjectLoad" style="height: 100%; background-color : white" :style="(isUserFinishedForm ? 'pointer-events: none;':'')+(isXs ? 'width: 100%' : 'width: 70vw')">
      <v-row justify="center" align="center" class="my-1">
          <div class="font-weight-light" :class="isXs ? 'text-h4' : 'text-h3'" style="color : #e0a141">Auto-évaluation de mon projet</div>
      </v-row>

      <v-row class="mx-2 mb-2" justify="center">
          <h3 class="font-weight-light mt-2" >
            Comment réfléchir et faire évoluer son idée de startup ? <!--Plusieurs méthodes sont possibles :-->
          </h3>
      </v-row>
      <!--
      <v-row class="mt-2" justify="center">
          <h3 class="font-weight-light mt-2" >
            Tout d’abord, <b>qu’est ce qu’ une startup ?</b>
          </h3>
      </v-row>
      -->
      <v-row class="mx-1" justify="center" no-gutters>
          <v-expansion-panels>
              <v-expansion-panel block>
                <v-expansion-panel-header class="px-1"
                    disable-icon-rotate
                    expand-icon="mdi-help-circle"
                    >
                    <div class="d-inline-block text-truncate">
                      <h3 class="font-weight-light" >
                        Tout d’abord, <b>qu’est ce qu’ une startup ?</b>
                      </h3>
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <h3 class="font-weight-light" >
                    La première réponse qui vient à l’esprit et qui met tout le monde d’accord, c’est une jeune entreprise, agile, capable d’adapter rapidement son offre au marché et de croître tout aussi vite. Comme toute entreprise, elle doit répondre à un besoin et le satisfaire afin d’obtenir un marché. C’est en créant de la valeur pour ses utilisateurs, clients, fournisseurs, actionnaires, ... qu’une entreprise est viable. Il faut donc trouver une idée qui réponde à ces contraintes marchandes.
                    <br>
                    Mais c’est avant tout la conjonction d’un entrepreneur (-neuse) et de son projet. Pour ce faire, il est indispensable de se concentrer sur soi, car la cohérence homme-projet est centrale dans l’entrepreneuriat. Lancer sa startup, c’est se lancer dans une aventure où il va falloir tenir le rythme et rester performant jusqu’à la fin ... Et comment poursuivre un projet sur le long terme (et parfois sur le court terme!) si celui-ci n’est pas en adéquation avec nos valeurs, notre rythme de travail, l’écosystème ou tout autre raison?Il convient donc au préalable, de se poser les bonnes questions, pour suivre avec efficacité les méthodes pour trouver des idées d’entreprise. Alors, « let’s go » !
                  </h3>
                </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-row>
      <v-row class="mx-2" justify="center">
          <p class="font-weight-light mt-2" >
            90% des jeunes entreprises ne survivent pas 3 ans. L'absence de réponse à un besoin du marché est le premier motif d’échec des entreprises.
          </p>
      </v-row>
      <v-row>
              <v-divider class="my-1"></v-divider>
      </v-row>
      <v-row class="mx-2" justify="center">
          <p class="font-weight-light mt-2" >
            Evaluez l'avancement de votre projet sur cinq étoiles pour chacunes des affirmations suivantes :
          </p>
      </v-row>
      <v-row>
              <v-divider class="my-1"></v-divider>
      </v-row>
      <!--
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsFirstPart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :title="question.title"
                                :type="question.type"
                                :textFieldPrefix="question.textFieldPrefix"
                                :questionTitle="question.questionTitle"
                                :questionItems="question.questionItems"
                                :descriptionItems="question.descriptionItems"
                                :initialValue="question.initialValue"
                                @emitUserAnswered="userAnswered($event, index)"
                            />
                </v-row>
                <v-row>
                        <v-divider class="my-1"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>
    -->

    <v-row justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">💡 - Légitimité : ADN du projet</h2>
        </v-col>
    </v-row>
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsLegitimitePart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :type="question.type"
                                :questionTitle="question.questionTitle"
                                :initialValue="succeedInfo.legitimite[index]"
                                :descriptionItems="question.descriptionItems ? question.descriptionItems : []"
                                @emitUserAnswered="userAnsweredForChart($event, index, 'legitimite')"
                            />
                </v-row>

                <v-row>
                        <v-divider class="mt-2 mb-4" style="margin-left : 40%; margin-right : 40%"></v-divider>
                </v-row>
            </v-list>
        </v-col>    
        <v-col cols="12">
          <v-textarea rows=2 v-model="legitimitePrecisionTextFieldModel" @blur="userGavePrecision('legitimite', legitimitePrecisionTextFieldModel)" label="Vous pouvez apporter des précisions ici">
          </v-textarea>
        </v-col>
        <v-col cols=12>
          <v-divider class="mb-3"></v-divider>
        </v-col>
        <v-col id="chartContainer" class="pa-0 mb-2" style="height : 10vh" cols=12>

            <v-row @click="isChartExtend = !isChartExtend" class="my-0 mx-0" justify="center" align="center" :style="(!isXs && isChartSticky ? 'width : 70vw;' : 'width : -webkit-fill-available;') + (isChartSticky ? 'position : fixed; top : 7vh;' : 'position : relative;') + (isChartExtend ? 'height : 50vh' : 'height : 10vh' )" style="z-index : 10; max-width : inherit; transition: height 1s;">
              <v-col cols="12" class="pa-0" style="height : 100%">
                <v-card class="elevation-8" width="100%" height="100%">
                    <v-overlay opacity="0.05" :absolute="true" style="height : inherit; width : inherit !important">
                      <v-row no-gutters justify="end">
                        <v-btn icon fab style="right : 0; top : 0">
                          <v-icon color="black">
                            {{ isChartExtend ? 'mdi-close' : 'mdi-arrow-expand-all'}}
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </v-overlay>
                    <canvas id="myChart" style="max-width : 100%; max-height : 100%"></canvas>
                </v-card>
              </v-col>
            </v-row> 
            <!--
            -->
          <!--
          <v-row justify="center" align="center" style="z-index : 10; width : 100vw" :class="isChartExtend ? 'chart-container-extended' : ('chart-container-minimyzed mb-1 pr-1')">
            <v-col @click="isChartExtend = !isChartExtend" cols="11" style="height : 100%; border-color : black; border-style: groove; background-color : white ;">
              <canvas id="myChart" style="max-width : 100%; max-height : 100%"></canvas>
            </v-col>
          </v-row>
        -->
        </v-col>
    </v-row>

    <v-row>
        <v-divider class="my-4"></v-divider>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">❤️ - Désirabilité : analyse des usages</h2>
        </v-col>
    </v-row>
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsDesirabilitePart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :type="question.type"
                                :questionTitle="question.questionTitle"
                                :initialValue="succeedInfo.desirabilite[index]"
                                :descriptionItems="question.descriptionItems ? question.descriptionItems : []"
                                @emitUserAnswered="userAnsweredForChart($event, index, 'desirabilite')"
                            />
                </v-row>
                <v-row>
                        <v-divider class="mt-2 mb-4" style="margin-left : 40%; margin-right : 40%"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>    
    <v-row justify="center" align="center">
        <v-col cols="12">
          <v-textarea rows=2 v-model="desirabilitePrecisionTextFieldModel" @blur="userGavePrecision('desirabilite', desirabilitePrecisionTextFieldModel)" label="Vous pouvez apporter des précisions ici">
          </v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-2 mb-4"></v-divider>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">🤗 - Acceptabilité : analyse de votre ecosystème</h2>
        </v-col>
    </v-row>
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsAcceptabilitePart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :type="question.type"
                                :questionTitle="question.questionTitle"
                                :initialValue="succeedInfo.acceptabilite[index]"
                                :descriptionItems="question.descriptionItems ? question.descriptionItems : []"
                                @emitUserAnswered="userAnsweredForChart($event, index, 'acceptabilite')"
                            />
                </v-row>
                <v-row>
                        <v-divider class="mt-2 mb-4" style="margin-left : 40%; margin-right : 40%"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12">
          <v-textarea rows=2 v-model="acceptabilitePrecisionTextFieldModel" @blur="userGavePrecision('acceptabilite', acceptabilitePrecisionTextFieldModel)" label="Vous pouvez apporter des précisions ici">
          </v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-2 mb-4"></v-divider>
    </v-row>


    <v-row justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">⚙️ - Faisabilité : construction de votre offre</h2>
        </v-col>
    </v-row>
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsFaisabilitePart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :type="question.type"
                                :questionTitle="question.questionTitle"
                                :initialValue="succeedInfo.faisabilite[index]"
                                :descriptionItems="question.descriptionItems ? question.descriptionItems : []"
                                @emitUserAnswered="userAnsweredForChart($event, index, 'faisabilite')"
                            />
                </v-row>
                <v-row>
                        <v-divider class="mt-2 mb-4" style="margin-left : 40%; margin-right : 40%"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12">
          <v-textarea rows=2 v-model="faisabilitePrecisionTextFieldModel" @blur="userGavePrecision('faisabilite', faisabilitePrecisionTextFieldModel)" label="Vous pouvez apporter des précisions ici">
          </v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-2 mb-4"></v-divider>
    </v-row>


    <v-row justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">🏁 - Viabilité : vos couples produits/clients</h2>
        </v-col>
    </v-row>
    <v-row justify="center" align="center" style="maring-bottom : 5vh">
        <v-col cols="12">
            <v-list v-for="(question, index) in questionsViabilitePart" :key="index">
                <v-row justify="center" align="center">
                            <form-question-module
                                :type="question.type"
                                :questionTitle="question.questionTitle"
                                :initialValue="succeedInfo.viabilite[index]"
                                :descriptionItems="question.descriptionItems ? question.descriptionItems : []"
                                @emitUserAnswered="userAnsweredForChart($event, index, 'viabilite')"
                            />
                </v-row>
                <v-row>
                        <v-divider class="mt-2 mb-4" style="margin-left : 40%; margin-right : 40%"></v-divider>
                </v-row>
            </v-list>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12">
          <v-textarea rows=2 v-model="viabilitePrecisionTextFieldModel" @blur="userGavePrecision('viabilite', viabilitePrecisionTextFieldModel)" label="Vous pouvez apporter des précisions ici">
          </v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <v-divider class="mt-2 mb-4"></v-divider>
    </v-row>

    <v-row justify="center" align="center">
        <v-btn @click="userFinishedForm" color="primary">
            Resultat de mon auto-évaluation
        </v-btn>
    </v-row> 
    <v-row class="pt-2" justify="center" align="center">
        <v-card-actions class="justify-end">
            <a v-if="!succeedInfo.userMail" :href="`mailto:contact@tooap.com?subject=Projet Startup-Elevator: ${succeedInfo.title}, ${succeedInfo.userLastName} &body=Bonjour%20à%20vous%20Startup-Elevator! %0D%0A%0D%0Adescription%20du%20projet%20:%0D%0A%0D%0A${succeedInfo.description} %0D%0A%0D%0A%0D%0A%0D%0A${succeedInfo.userLastName}`" style="text-decoration : none">
                <v-btn outlined color="primary">
                    <v-icon>mdi-email-send</v-icon>&nbsp;Nous envoyer un e-mail
                </v-btn>
            </a>
          </v-card-actions>
        <v-btn v-if="succeedInfo.userMail" :to="{path : '/form/financement'}" outlined color="primary">
            Continuer vers financement
        </v-btn>
    </v-row>
<!--
    <v-row class="elevation-20" style="height : 5vh; position: fixed; width: 100vw; bottom: 0; left: 0;background-color : white; border-radius: 10px; z-index : 1" no-gutters align-content="center">
        <v-col class="pr-1" cols="2">
          <v-btn
                color="primary"
                dark
                outlined
                block
                class="pa-0 white-background"
                height="100%"
                @click="goBack"
              >
              &lt;
          </v-btn>
        </v-col>
        <v-col cols=8 class="fill-height">
          <v-row no-gutters style="height :100%;" align-content="center">
              <v-col class="py-2" :cols="progression" style="background-color : #e0a141; border-radius : 5px"/>
              <v-col class="py-2" :cols="12 - progression" style="background-color : transparent; border-radius : 5px"/>
          </v-row>
        </v-col>
        <v-col class="pl-1" cols="2">
          <v-btn
                outlined
                color="#e0a141"
                dark
                block
                height="100%"
                class="px-0 white-background"
                @click="goNext"
              >
              &gt;
          </v-btn>
        </v-col>
      </v-row>
      -->

    </v-container>
    <v-container v-else fluid style="height: 100%;">
    </v-container>
    <v-dialog
      v-model="isUserFinishedForm"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="white"
            dark
          >
            <v-row justify="space-between" align="center" no-gutters style="height : inherit">
              <v-col cols=10 class="text-h5 text-truncate" :style="`color : ${$route.meta.toolbarColor}`">
                Votre auto-évaluation
              </v-col>
              <v-col cols=2 class="text-end" style="height : inherit">
                <v-btn max-width="100%" height="100%" color="primary" @click="dialog.value = false;closePopup()">
                  <v-icon color="white">
                      mdi-close
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text class="px-4">
            <v-row>
              <div class="text-h5 py-3 px-2 text-justify text-capitalize">{{ succeedInfo.title && succeedInfo.title !="" ? succeedInfo.title : "Votre futur projet" }} :</div>
            </v-row>
            <v-row no-gutters>
              <canvas id="myChartPopup" style="max-width : 100%; max-height : 80vh"></canvas>
            </v-row>
            <v-row>
              <div class="text-h6 py-3 px-2 text-justify">
                Mes axes d'améliorations :
                <br>
                {{ameliorationAxes[0]}}
                <br>
                {{ameliorationAxes[1]}}
              </div>
            </v-row>
            <v-row>
                <v-divider></v-divider>
            </v-row>
            <v-row>
              <div class="text-h6 py-3 px-2 text-justify">Vous pouvez désormais être recontacté par votre expert Startup Elevator pour un accompagnement avancé de votre projet</div>
            </v-row>
            <v-row>
              <div class="text-h6 pt-2 text-justify">
                Votre <b>mail</b> et votre <b>téléphone</b> sont nécessaires afin que nous puissions vous recontacter
              </div>
              <v-btn @click="userWantToBeCallNow" color="primary" block>
                  Compléter mon profil
              </v-btn>
            </v-row>
            <v-row class="pt-2">
                <v-divider></v-divider>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <a :href="`mailto:contact@tooap.com?subject=Projet Startup-Elevator: ${succeedInfo.title}, ${succeedInfo.userLastName} &body=Bonjour%20à%20vous%20Startup-Elevator! %0D%0A%0D%0Adescription%20du%20projet%20:%0D%0A%0D%0A${succeedInfo.description} %0D%0A%0D%0A%0D%0A%0D%0A${succeedInfo.userLastName}`" style="text-decoration : none">
                <v-btn outlined color="primary">
                    <v-icon>mdi-email-send</v-icon>&nbsp;Nous envoyer un e-mail
                </v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</section>
</template>

<script>
import Vue from "vue"
import FormQuestionModule from '../components/FormQuestionModule.vue';
import Projects from '../../api/collections/Projects'
//import Radar from "vue-radar"
import Chart from 'chart.js/auto';


export default {
  components: {
    FormQuestionModule,
  },
  data() {
    return {
      isXs : false,
      //question projet
      questionsFirstPart : [ 
        {   
          type: 'textfield',
          title : "A - Quel problème allez vous résoudre , quel besoin est à satisfaire ?",
          questionTitle : "A quoi cela va-t-il servir ? Qui va bénéficier de ce service ?",
          descriptionItems : [
              "<span><b>Quel est le problème ?</b> Est ce que vos premiers prospects sont perdus lorsque vous leur parlez de vos projets? Est ce qu’ils comprennent bien ce que vous leur proposez ? Est ce que quelque chose d’impossible à réaliser maintenant devient possible grâce à votre projet (produit, idée ...) ? Vous constaterez parfois, en posant ces questions, que vous résolvez un <b>problème imaginaire</b>. C’est alors le moment de faire une pause et de réévaluer ce que vous êtes en train de faire.</span>"
            ],
            initialValue :''
        },
        {   
          type: 'textfield',
          title : "B - Est ce que ce produit est utile ? Explicitez, pour qui et pourquoi ?",
          questionTitle : "",
          descriptionItems : [
              "<span><b>Construisez vous quelque chose d’utile</b> ou juste « quelque chose » ?! Il est très facile de confondre enthousiasme et utilité. C’est souvent génial de créer des projets. Mais créer un projet ou une entreprise ne fait pas de vous un entrepreneur.Il faut simplement vous demander si c’est utile à une problématique. Les idées « cool » disparaissent ; les idées utiles perdurent.</span>"
            ],
            initialValue :''
        },
        {   
            type: 'textfield',
            title : "C - Démarrer à l’épicentre du problème !",
            questionTitle : "Quel est l’épicentre de votre produit ?",
            descriptionItems : [
              "<span>Quand vous démarrez un nouveau projet, des forces vous tirent dans des tas de directions différentes. Il y a les choses : <br>- que vous pourriez faire, <br>- que vous avez envie de faire, <br>- que vous devez faire !<br><br>Il est très facile de se perdre en chemin et d’utiliser son énergie au mauvais endroit. Vous devez commencer par les choses que vous devez faire ! <br><br>Par exemple si vous ouvrez un stand de hot dog, vous devez vous concentrer dans la production d’un bon hot dog ! Oubliez votre stand, votre logo, votre slogan publicitaire, si vous avez un mauvais hot dog tout cela sera inutile ! </span>"
            ],
            initialValue :''
        },
        {   
            type: 'textfield',
            title : "D - Objectifs de long terme",
            questionTitle : "<span><b>Ou souhaitez-vous être dans 12 mois ? Qu’avez-vous réalisé dans 12 mois ? Quel est l’objectif du CEO ou responsable de votre équipe ? Pour quelle raison réalisons-nous ce projet ?</b><br>Cela pourrait dans un premier temps paraître évident, mais c’est la question la plus importante. Il faut généralement quelques heures pour bien formuler votre objectif de long terme. Il faut qu’il soit précis mais pas trop ! Rassurez-vous, nous retravaillerons votre objectif de long terme avec vous.</span>",

            textFieldPlaceholder: "15 jours par mois à mon projet, 5 000 € d’investissement, 2 ans",
            descriptionItems : [
                "<span><b>Exemples : </b><br>- Faciliter la garde d’enfants dans un cadre sécurisé et satisfaire l'enfant. <br>- Convaincre la direction Peugeot d'utiliser notre solution qui améliore la productivité des équipes et la réputation de l'établissement. <br>- Vendre une centaine d'abonnements à notre service dans les mairies et qu'ils soient utilisés par les jardiniers de la commune.</span>"
            ],
            initialValue :''
        },
        {   
          type: 'dropdown',
          title : "E - Quatre chemins pour innover",
          questionTitle : "Quel type d’innovation souhaitez vous apporter ?",
          questionItems : [ 
              "Travailler sur l’amélioration d’un produit ou service déjà existant",
              "L’innovation disruptive, inventer du nouveau pour répondre à un besoin",
              "Innover sur le business model : penser en dehors du cadre",
              "Le copycat : saisir une opportunité de marché"
              ],
          descriptionItems : [
              "<span><b>Travailler sur l’amélioration d’un produit ou service déjà existant</b><br>Quand on pense à startup, on pense souvent à innovation. Et quand on pense à innovation, on pense à quelque chose de totalement nouveau, à du jamais vu ; or, ceci est de l’invention. L’innovation a lieu dès lors qu’on constate une amélioration, une différenciation par rapport à l’offre actuelle, et qui a une valeur sur le marché.<br>Réfléchir à des améliorations de produits ou de services déjà existants est donc un bon moyen de trouver une idée de startup. Voici trois axes de réflexion :<br>- L’ajout de fonctionnalités / de services. <br>Prenons l’exemple de quelque chose que l’on utilise tous les jours : le réveil. C’est un objet qui existe depuis très longtemps, avec un seul but : nous permettre de nous réveiller à l’heure voulue. Pourtant, de nombreuses entreprises ont travaillé à l’amélioration de cet objet pourtant très commun. Nous pouvons désormais acheter des réveils olfactifs ou des réveils “simulateurs d’aube” pour se réveiller plus en douceur. Ces innovations, qui croisent plusieurs technologies existantes, trouvent un marché du fait d’une proposition de valeur différente pour un objet dont la fonction de base est identique. Pour ce qui est des services, on peut prendre l’exemple de La Poste, qui a ajouté à son offre de livraison de courrier, un service de visite des personnes âgées isolées.<br>- Un positionnement marketing différent. <br>Ici, on prend un produit déjà existant, auquel on n’ajoute aucun élément différenciant majeur, mais que l’on positionne différemment sur le marché : pour une autre cible, avec une autre identité, avec d’autres valeurs mises en avant, ... C’est le cas de la startup Respire par exemple, qui a débuté sa success story avec la vente de déodorants naturels à destination d’un public peu renseigné sur ce qu’ils s’appliquent sur la peau. Le déodorant naturel, tout comme leurs produits suivants, n’ont rien de nouveau : ils existent déjà depuis de nombreuses années dans les magasins spécialisés (bio, zéro déchet, ...). Seulement, ces enseignes spécialisées attirent des personnes déjà sensibilisés, soucieuses de mieux consommer, soit un public restreint. Le pari de Respire est d’amener ce type de produit dans la grande distribution avec une image beaucoup plus fun, et d’éduquer les consommateurs non-sensibilisés à la cosmétique. En se positionnant différemment, ils touchent ainsi une autre cible.<br>- Détourner l’usage d’un bien ou service. <br>C’est le cas de la pâte à modeler Play-Doh par exemple, avec laquelle nous avons tous joué étant enfants. Initialement cette pâte à modeler servait de nettoyant pour papier peint. En détourner l’usage a notamment permis à l’entreprise de survivre aux difficultés qu’elle rencontrait. Pour les services, c’est le cas de certaines sociétés de covoiturage qui utilisent leur réseau de covoitureurs pour le proposer, durant des trajets de transport de personnes, d’acheminer dans leur coffre un colis.<br>Lorsqu’il est question d’améliorations de biens ou services déjà existants, il est extrêmement pertinent de s’appuyer sur les retours des utilisateurs. Faire un prototype, le faire tester, prendre les retours, et recommencer. Cette logique de co-création s’appelle le lean startup, et permet plus d’agilité, de pertinence, et de légitimité sur le marché. Les utilisateurs dirigent le développement, on parle de user-driven innovation : ils oeuvrent ainsi au développement d’un produit ou d’un service qui leur correspond vraiment.</span>",
              "<span><b>L’innovation disruptive, inventer du nouveau pour répondre à un besoin</b><br>L’innovation disruptive fait plutôt référence à l’invention dans le sens où elle crée quelque chose de nouveau pour répondre à un problème : un nouveau produit, un nouveau service, un nouveau besoin. Attention, cela doit toujours répondre à une problématique et au marché pour être viable économiquement, sinon cela reste une invention ; ce qui différencie une invention d’une innovation est que l’innovation a trouvé son marché, et est donc viable.<br>Pour avoir une idée d’innovation disruptive, il faut donc partir d’une problématique, d’un besoin, puis faire appel à sa créativité et / ou la créativité d’un groupe de personnes : des experts du domaines, des utilisateurs potentiels, des parties prenantes, etc... Souvent, les nouvelles technologies sont associées à ces innovations, et la conception a une durée relativement importante, du fait de longues phases de recherches, de tests, de validations, mais aussi de mise en normes. Comme toute nouveauté, il peut parfois y avoir des réticences, mais comme disait Henry Ford, qui a démocratisé la voiture : “Si j’avais demandé aux gens ce qu’ils voulaient, ils auraient répondu des chevaux plus rapides”. Pour vous donner un exemple plus parlant, prenons le cas de la gyroroue, en photo ci- dessous.<br>Ce moyen de transport, qui semble sorti des films de science-fiction, répond initialement au besoin de se déplacer dans les grandes ville. En effet, les axes routiers sont souvent surchargés et le stationnement en voiture est un vrai casse-tête. Les transports en commun sont souvent bondés. Le vélo ou la trotinettes sont relativement encombrants. L’inventeur de la gyroroue répond donc à la problématique de se déplacer en ville, mais de manière beaucoup plus rapide et pratique que les moyens de transports déjà existants. L’engin est petit, facilement transportable, et permet de se déplacer vite et sans effort.</span>",
              "<span><b>Innover sur le business model : penser en dehors du cadre</b><br>Travailler sur le modèle économique d’une activité est le meilleur moyen de réinventer son secteur, ou du moins de se différencier de ses concurrents.<br>Pour cela, un outil est très utile : le business model canva. Ci-dessous, voici le business model canva de Uber, que nous allons prendre en exemple.<br>Cet outil permet de visualiser de manière synthétique le modèle économique d’une entreprise, comprenant au centre la proposition de valeur, qui est l’élément central d’un business. A gauche de celle-ci, on retrouve les parties prenantes clés, les activités clés de l’entreprise, les ressources nécessaires pour piloter ces activités ; en dessous de ces trois cases, on note les coûts qui y sont liés. C’est la partie en amont de l’acte de vente. A droite de la proposition de valeur, on observe trois parties réservés à la cible, la relation client, et aux canaux de distribution. Ces parties étant liées à la commercialisation et donc aux revenus, on retrouve les flux entrants en dessous.<br>Pour trouver une idée en travaillant sur le business model, il suffit de reproduire celui d’un secteur d’activité, et d’essayer de changer les éléments d’une ou plusieurs cases. Uber se différencie de cette manière : l’entreprise s’est appuyée sur le business model des taxis, et a changé principalement le canal de distribution (qui a, de fait, impacté les ressources clés, la structure des coûts, etc...). Ainsi, pour se déplacer avec un chauffeur, il suffit désormais de se connecter sur une application gérée par des algorithmes permettant notamment de faire baisser le prix de ce genre de transport, plutôt qu’appeler un standard téléphonique.<br>NB : un autre moyen de moduler un business model existant pour trouver une idée est de travailler sur la chaîne de valeur (fournisseurs, distributeurs, etc...). Ainsi, supprimer des intermédiaires, modifier la logistique, ou bien trouver des types de distributeurs totalement différents peut être un bon moyen de trouver une idée différenciante de startup.</span>",
              "<span><b>Le copycat : saisir une opportunité de marché</b><br>Le copycat, c’est tout simplement recopier chez soi une idée de business vue ailleurs. Ça peut être par exemple le cas d’enseignes de restauration, comme avec l’essor récent des chaînes de poke bowls, des spécialités hawaïennes qui étaient inconnues en France jusqu’il y a peu. Les inspirations viennent alors lors de voyages ou même en se renseignant depuis chez soi.<br>Outre l’importation d’une idée d’un autre pays, le copycat peut aussi correspondre au fait de recopier un business propre à un secteur d’activité pour un autre secteur. Par exemple, les plateforme de location d’appartements touristiques ont connu un franc succès.<br>Certains entrepreneurs ont eu l’idée de créer des plateformes de location de foodtrucks, de salles des fêtes, ou encore de jeux gonflables pour les enfants.<br></span>",
          ],
            initialValue :''
        },
        {   
          type: 'textfield',
          title : "F - Pourquoi je souhaite créer ce produit ou service ?",
          questionTitle : "Quelles sont mes motivations personnelles ?",
          descriptionItems : [
            "C’est la première question à se poser. La réponse peut être composée de plusieurs éléments : par passion, par désir d’autonomie, de liberté, de plus de responsabilités, pour gagner plus d’argent, pour créer du sens en devenant acteur du monde de demain, ... Il n’y a pas de mauvaise réponse, à partir du moment où ce sont vraiment les vôtres. Attention aux ambitions d’autrui qu’on intègre pour soi, aux croyances limitantes, aux idées reçues. C’est vous-même que vous questionnez, avec vos propres désirs et peurs, pas ceux des autres. Identifiez vos motivations à entreprendre vous permettra notamment de sélectionner ou d’éloigner certains secteurs d’activité."
            ],
            initialValue :''
        },
        {   
          type: 'textfield',
          title : "G - Quelles sont mes ressources ? Qu’ai-je dans mon frigo ?",
          questionTitle : "",
          textFieldPrefix : "Je peux consacrer",
          textFieldPlaceholder: "15 jours par mois à mon projet, 5 000 € d’investissement, 2 ans",
          descriptionItems : [
              "Par ressources, il faut comprendre tout élément qui peut être utile dans la création d’une entreprise : temps disponible (ex : 10 mois en temps plein), compétences (ex : expertise en développement back-end), argent à investir (ex : épargne de 5 000€), réseau professionnel et personnel (ex : réseau pro de freelance graphistes ; un avocat d’affaire dans ma famille), et tout autre ressources pouvant être utile à la création d’un projet (accès à un espace de travail, outils à ma disposition, organismes d’accompagnements, etc...).<br>Vous pouvez les lister pour les visualiser, et pouvoir ensuite composer avec. Cette logique effectuale vous fait prendre appui sur ce que vous avez déjà, pour vous fixer des objectifs pertinents et réalisables, vous permettant d’être rapidement dans l’action."
            ],
            initialValue :''
        },
        {   
          type: 'rating',
          title : "H - Test rating",
          questionTitle : "",
          descriptionItems : [
              "Par ressources, il faut comprendre tout élément qui peut être utile dans la création d’une entreprise : temps disponible (ex : 10 mois en temps plein), compétences (ex : expertise en développement back-end), argent à investir (ex : épargne de 5 000€), réseau professionnel et personnel (ex : réseau pro de freelance graphistes ; un avocat d’affaire dans ma famille), et tout autre ressources pouvant être utile à la création d’un projet (accès à un espace de travail, outils à ma disposition, organismes d’accompagnements, etc...).<br>Vous pouvez les lister pour les visualiser, et pouvoir ensuite composer avec. Cette logique effectuale vous fait prendre appui sur ce que vous avez déjà, pour vous fixer des objectifs pertinents et réalisables, vous permettant d’être rapidement dans l’action."
            ],
            initialValue :''
        },
      ],
      questionsLegitimitePart : [ 
        {   
          type: 'rating',
          questionTitle : "Vous avez identifié un vrai problème que vous pourriez résoudre grâce à votre innovation. Ce problème est une véritable \"épine dans le pied\" pour certaines personnes (et pas seulement pour vous-même).",
          initialValue :0,
          descriptionItems : [
            "<span><b>Quel est le problème ?</b> Est ce que vos premiers prospects sont perdus lorsque vous leur parlez de vos projets? Est ce qu’ils comprennent bien ce que vous leur proposez ? Est ce que quelque chose d’impossible à réaliser maintenant devient possible grâce à votre projet (produit, idée ...) ? Vous constaterez parfois, en posant ces questions, que vous résolvez un <b>problème imaginaire</b>. C’est alors le moment de faire une pause et de réévaluer ce que vous êtes en train de faire.</span>"
          ],
        },
        {   
          type: 'rating',
          questionTitle : "Vous êtes crédible et légitime pour porter ce projet : vous disposez de moyens intellectuels, physiques, techniques, humains & financiers solides pour résoudre ce problème.",
          initialValue :0,          
          descriptionItems : [
            "Par ressources, il faut comprendre tout élément qui peut être utile dans la création d’une entreprise : temps disponible (ex : 10 mois en temps plein), compétences (ex : expertise en développement back-end), argent à investir (ex : épargne de 5 000€), réseau professionnel et personnel (ex : réseau pro de freelance graphistes ; un avocat d’affaire dans ma famille), et tout autre ressources pouvant être utile à la création d’un projet (accès à un espace de travail, outils à ma disposition, organismes d’accompagnements, etc...).<br>Vous pouvez les lister pour les visualiser, et pouvoir ensuite composer avec. Cette logique effectuale vous fait prendre appui sur ce que vous avez déjà, pour vous fixer des objectifs pertinents et réalisables, vous permettant d’être rapidement dans l’action."
          ],
        },
        {   
          type: 'rating',
          questionTitle : "Vous disposez d'un \"avantage déloyal\" , c'est à dire des moyens, des capacités que les autres n'ont pas. Comme une expertise, une base de client importante, un accès privilégié au marché, un brevet, une marque puissante. A noter que les atouts suivant sont rarement \"déloyaux\" : \"etre moins cher\", \"avoir le plus de fonctionnalités\"",
          initialValue :0,
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez identifié un domaine d'application , un marché qui peut être intéressé par votre produit innovant.",
          initialValue :0,
          descriptionItems : [
            "<span><b>Construisez vous quelque chose d’utile</b> ou juste « quelque chose » ?! Il est très facile de confondre enthousiasme et utilité. C’est souvent génial de créer des projets. Mais créer un projet ou une entreprise ne fait pas de vous un entrepreneur.Il faut simplement vous demander si c’est utile à une problématique. Les idées « cool » disparaissent ; les idées utiles perdurent.</span>"
          ],
        },
      ],
      legitimitePrecisionTextFieldModel : "",
      questionsDesirabilitePart : [ 
        {   
          type: 'rating',
          questionTitle : "Vous avez identifié des besoins importants à satisfaire chez certaines personnes, c'est à dire des besoins mal satisfaits par les solutions existantes. Des besoins \"must-have\" plutôt que \"nice to have\".",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez vérifié auprès d'au moins 5 personnes qu'elles expriment bien ces besoins clés via des entretiens ou échanges.",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez identifié les principales solutions actuellement utilisées par ces personnes pour répondre à leurs besoins.",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Ces personnes affirment être insatisfaites des solutions existantes, elles aimeraient autre chose.",
          initialValue :0
        },
      ],
      desirabilitePrecisionTextFieldModel : "",
      questionsAcceptabilitePart : [ 
        {   
          type: 'rating',
          questionTitle : "Vous connaissez les acteurs de votre écosystème : clients, concurrents, distributeurs...",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez identifié les acteurs qui seront favorables OU défavorables à votre innovation.",
          initialValue :0
        },
      ],
      acceptabilitePrecisionTextFieldModel : "",
      questionsFaisabilitePart : [ 
        {   
          type: 'rating',
          questionTitle : "L’ offre, les fonctionnalités définies répondent aux besoins clés à satisfaire .",
          initialValue :0,
          descriptionItems : [
            "<span>Quand vous démarrez un nouveau projet, des forces vous tirent dans des tas de directions différentes. Il y a les choses : <br>- que vous pourriez faire, <br>- que vous avez envie de faire, <br>- que vous devez faire !<br><br>Il est très facile de se perdre en chemin et d’utiliser son énergie au mauvais endroit. Vous devez commencer par les choses que vous devez faire ! <br><br>Par exemple si vous ouvrez un stand de hot dog, vous devez vous concentrer dans la production d’un bon hot dog ! Oubliez votre stand, votre logo, votre slogan publicitaire, si vous avez un mauvais hot dog tout cela sera inutile ! </span>"
          ],
        },
      ],
      faisabilitePrecisionTextFieldModel : "",
      questionsViabilitePart : [ 
        {   
          type: 'rating',
          questionTitle : "Vous avez testé vos produits et services auprès de clients : ils ont bien compris ce que vous vendez et ont manifesté leur intérêt.",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez testé votre modèle de revenu auprès de clients potentiels.",
          initialValue :0
        },
        {   
          type: 'rating',
          questionTitle : "Vous avez trouvé les moyens de vendre aux cibles clients : force de vente, site web,réseaux sociaux, marketing … ",
          initialValue :0
        },
      ],
      viabilitePrecisionTextFieldModel : "",


      endPopup : {
        title : "MERCI",
        descr : "Votre projet est lancé !",
        closeButton : "Fermer"
      },


      //projectinfo
      succeedInfo : {
        termAndCondition :false,
        legitimite : [0,0,0,0],
        legitimitePrecision : "",
        desirabilite : [0,0,0,0],
        desirabilitePrecision : "",
        acceptabilite : [0,0],
        acceptabilitePrecision : "",
        faisabilite : [0],
        faisabilitePrecision : "",
        viabilite : [0,0,0],
        viabilitePrecision : "",
        succeedQuestion1A : "",
        succeedQuestion1B : "",
        succeedQuestion1C : "",
        succeedQuestion1D : "",
        succeedQuestion1E : "",
        succeedQuestion1F : "",
        succeedQuestion1G : ''
      },

      isCurrentProjectLoad : false,

      isUserFinishedForm : false,

      scrollPos : [0, 0],
      //chart
      myChart : null,
      myChartPopup : null,
      chartData : {
        labels: [
          '💡 Légitimité',
          '❤️ Désirabilité',
          '🤗 Acceptabilité',
          '⚙️ Faisabilité',
          '🏁 Viabilité',
        ],
        datasets: [
          {
            label: 'Avancement du projet',
            data: [0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: "rgba(224,160,65, 0.5)",
            borderColor: '#e0a141',
            pointBackgroundColor: '#E0a141',
            pointBorderColor: '#E0a141',
            pointHoverBackgroundColor: '#616161',
            pointHoverBorderColor: 'E0a141'
          }
        ]
      },
      chartOptions : {
        plugins : {/*
          labels : {
            font : {
              weight : 'bold',
              size : 20
            }
          },*/
          legend : {
            labels : {
              fontSize : 20
            },
            display : false
          },
        },
        responsive : true,
        maintainAspectRatio : true,
        aspectRatio : 1,
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scale : {
          ticks : {
            stepSize : 20,
          }
        },
        scales: {
          r: {
              angleLines: {
                  display: false
              },
              ticks : {
                font : {
                  weight : 'bold',
                  size : 15//isChartExtend ? 15 : 7
                }
              },
              pointLabels : {
                font : {
                  weight : 'bold',
                  size : 25//isChartExtend ? 25 : 15
                }
              },
              suggestedMin: 0,
              suggestedMax: 100,
          }
        }
      },
      isChartExtend : false,
      isScreenLandscape : window.outerWidth < window.innerHeight,
      isChartSticky : false,
      chartPosition : "relative"
    }
  },
  methods : {
    onResize() {
        this.isXs = window.outerWidth < 850;
        this.isScreenLandscape = window.outerWidth < window.innerHeight
    },
    onScroll() {
      this.isChartSticky = document.getElementById("chartContainer").getBoundingClientRect() ? document.getElementById("chartContainer").getBoundingClientRect().y <= 74 : false
    },
    goBack() {
        //this.$router.push({path :'/form/financement'})
    },
    goNext() {
        
    },
    userAnswered(answer, questionIndex){
      let answerId = 'succeedQuestion1'+ String.fromCharCode('A'.charCodeAt(0) + questionIndex)  
      this.succeedInfo[answerId] = answer
      if (this.currentProjectId !='') {
          Meteor.call('updateProjectSucceedInfoById', 
              this.currentProjectId, 
              this.succeedInfo, 
              (error) => {
                  if (error){
                    console.log(error);
                  }
              }
          )
      }
    },
    userAnsweredForChart(answer, questionIndex, chartPart){
      this.$set(this.succeedInfo, 'chartPart[questionIndex]', answer) //on utilise this.$set pour rendre a prop reactive et pouvoir entrer dans le watch
      this.succeedInfo[chartPart][questionIndex] = answer
      this.drawChart("myChart")
      if (this.currentProjectId !='') {
          Meteor.call('updateProjectSucceedChartById', 
              this.currentProjectId, 
              this.succeedInfo, 
              (error) => {
                  if (error){
                    console.log(error);
                  }
              }
          )
      }
    },
    userGavePrecision(partName, newVal) {
      this.succeedInfo[partName+"Precision"] = newVal
      if (this.currentProjectId !='') {
          Meteor.call('updateProjectSucceedChartById', 
              this.currentProjectId, 
              this.succeedInfo, 
              (error) => {
                  if (error){
                    console.log(error);
                  }
              }
          )
      }
    },
    userFinishedForm() {
      this.isUserFinishedForm = true
      this.$nextTick(() => {
        var ctx = document.getElementById("myChartPopup")
        var chartPopupOption = this.chartOptions
        chartPopupOption.scale.ticks.stepSize = 25
        chartPopupOption.scales.r.ticks.font.size = 15
        chartPopupOption.scales.r.pointLabels.font.size = 15
        this.myChartPopup = new Chart("myChartPopup", {
            type: 'radar',
            data: this.chartData,
            options: this.chartOptions,
          }) 
      })
      //this.$router.push({ path : '/form/financement'})
      //alert('Merci ! Votre projet est lancé !')
    },
    calculatedPercentage(dataset){
      var result = 0
      var coef = (100 / dataset.length) / 5
      dataset.forEach((val => {
        result += val * coef
      }))
      return result < 100 ? result : 100
    },
    drawChart(tagId) {
      var ctx = document.getElementById(tagId)
      if (this.succeedInfo.legitimite) {
        //this.$set(this.chartData.datasets[0].data, '0', this.calculatedPercentage(this.succeedInfo.legitimite))
        this.chartData.datasets[0].data[0] = this.calculatedPercentage(this.succeedInfo.legitimite)
        this.chartData.datasets[0].data[1] = this.calculatedPercentage(this.succeedInfo.desirabilite)
        this.chartData.datasets[0].data[2] = this.calculatedPercentage(this.succeedInfo.acceptabilite)
        this.chartData.datasets[0].data[3] = this.calculatedPercentage(this.succeedInfo.faisabilite)
        this.chartData.datasets[0].data[4] = this.calculatedPercentage(this.succeedInfo.viabilite)
      }
      if (ctx != null){
        if (!(this.myChart == null || this.myChart == undefined)) {
          this.myChart.destroy()
        }
        this.chartOptions.scale.ticks.stepSize = this.isChartExtend ? 25 : 50
        this.chartOptions.scales.r.ticks.font.size = this.isChartExtend ? 15 : 10
        this.chartOptions.scales.r.pointLabels.font.size = this.isChartExtend ? 15 : 10
        this.myChart = new Chart(tagId, {
          type: 'radar',
          data: this.chartData,
          options: this.chartOptions,
        }) 
      }
    },
    closePopup() {
      this.isUserFinishedForm = false;
      this.myChartPopup.destroy()
    },
    userWantToBeCallNow() {
      if ((!this.succeedInfo.userMail || this.succeedInfo.userMail == '') && (!this.succeedInfo.userTel || this.succeedInfo.userTel == '')) {
        //alert("Vous allez être redirigé vers la page profil, votre mail et/ou votre téléphone sont nécessaires afin que nous puissions vous recontacter.")
        this.$router.push({path : "/form/profile"})
      } else {
        //this.succeedInfo.userWantToBeCall = true
        //this.$set(this.succeedInfo, 'userWantToBeCall', true)
      }
    }
  },
  meteor : {
    currentProject () {
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (!this.isCurrentProjectLoad && myCurrentProjectInfo/* && this.financementInfo.financementOption != myCurrentProjectInfo.financementOption*/){
        this.succeedInfo = myCurrentProjectInfo

        if (this.succeedInfo.legitimite == undefined || this.succeedInfo.legitimite.length < this.questionsLegitimitePart.length) {
          this.succeedInfo.legitimite = new Array(this.questionsLegitimitePart.length)
          this.succeedInfo.legitimite.fill(0, 0, this.questionsLegitimitePart.length)
        }
        if (this.succeedInfo.desirabilite == undefined || this.succeedInfo.desirabilite.length < this.questionsDesirabilitePart.length) {
          this.succeedInfo.desirabilite = new Array(this.questionsDesirabilitePart.length)
          this.succeedInfo.desirabilite.fill(0, 0, this.questionsDesirabilitePart.length)
        }
        if (this.succeedInfo.acceptabilite == undefined || this.succeedInfo.acceptabilite.length < this.questionsAcceptabilitePart.length) {
          this.succeedInfo.acceptabilite = new Array(this.questionsAcceptabilitePart.length)
          this.succeedInfo.acceptabilite.fill(0, 0, this.questionsAcceptabilitePart.length)
        }
        if (this.succeedInfo.faisabilite == undefined || this.succeedInfo.faisabilite.length < this.questionsFaisabilitePart.length) {
          this.succeedInfo.faisabilite = new Array(this.questionsFaisabilitePart.length)
          this.succeedInfo.faisabilite.fill(0, 0, this.questionsFaisabilitePart.length)
        }
        if (this.succeedInfo.viabilite == undefined || this.succeedInfo.viabilite.length < this.questionsViabilitePart.length) {
          this.succeedInfo.viabilite = new Array(this.questionsViabilitePart.length)
          this.succeedInfo.viabilite.fill(0, 0, this.questionsViabilitePart.length)
        }
        this.legitimitePrecisionTextFieldModel = this.succeedInfo.legitimitePrecision ?? ""
        this.desirabilitePrecisionTextFieldModel = this.succeedInfo.desirabilitePrecision ?? ""
        this.acceptabilitePrecisionTextFieldModel = this.succeedInfo.acceptabilitePrecision ?? ""
        this.faisabilitePrecisionTextFieldModel = this.succeedInfo.faisabilitePrecision ?? ""
        this.viabilitePrecisionTextFieldModel = this.succeedInfo.viabilitePrecision ?? ""
/*

        for (i = 0; i < this.questionsFirstPart.length; i++) {
          let answerId = 'succeedQuestion1'+ String.fromCharCode('A'.charCodeAt(0) + i)  
          this.succeedInfo[answerId]= myCurrentProjectInfo[answerId]
          this.questionsFirstPart[i].initialValue = myCurrentProjectInfo[answerId]
        }

        this.succeedInfo.termAndCondition= myCurrentProjectInfo.termAndCondition
*/
        this.drawChart("myChart")
        this.isCurrentProjectLoad = true
      }
      return this.succeedInfo
    },
  },
  mounted() {
    this.$vuetify.goTo(0);
    
    this.currentProjectId = this.$cookies.get("currentProjectId") ?? ''
    this.$subscribe('projects', [this.currentProjectId])
    
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("scroll", this.onScroll);

    this.drawChart("myChart")

/*
    this._scrollListener = () => {
      this.scrollPos = [
        Math.round(window.pageXOffset),
        Math.round(window.pageYOffset)
        ]
    }
    this._scrollListener()
    window.addEventListener('scroll', this._scrollListener)
  */
  },

  updated() { 
    this.drawChart("myChart")
  },
  beforeDestroy() {
    if (!(this.myChart == null || this.myChart == undefined)) {
      this.myChart.destroy()
    }
    window.removeEventListener('scroll', this.onScroll)
  },


  computed :{
    progression(){
      return 0/*
      if (this.$refs.succeedForm != undefined){
        //console.log(this.scrollPos[1] , this.$refs.succeedForm.scrollHeight);
        return Math.round(12 * this.scrollPos[1] / this.$refs.succeedForm.scrollHeight)
      } else {
        return 0
      }*/
    },
    ameliorationAxes() {
      var myData = this.chartData.datasets[0].data
      var minPercentageIndex = 0
      var res = []
      myData.forEach((calculatedPercentage, index) => {
        if (myData[minPercentageIndex] > calculatedPercentage) {
          minPercentageIndex = index
        }
      })

      res.push(this.chartData.labels[minPercentageIndex])
      let firstMinPercentageIndex = minPercentageIndex
      minPercentageIndex = firstMinPercentageIndex > 0 ? 0 : 1
      myData.forEach((calculatedPercentage, index) => {
        if (firstMinPercentageIndex != index && myData[minPercentageIndex] >= calculatedPercentage) {
          minPercentageIndex = index
        }
      })
      res.push(this.chartData.labels[minPercentageIndex])
      return res
    }
  }
}
</script>

<style>
.chart-container-extended {
  top : 0;
  height: 80vh;
}
.chart-container-minimyzed {
  top: 0;
  height: 15vh;
}
.modal-overlay {
  box-sizing: border-box;
  position: fixed;
  top: 40%;
  left: 5%;
  height : 20%;
  width: 90%; 
  background-color : white; 
  border-radius: 10px; 
  z-index : 22;
}
.modal-container { 
  top : 0;
  left:0;
  z-index : 21;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  backdrop-filter: blur(10px);
  position: fixed;
}
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

<style lang="scss">
.v-overlay__content {
  width: inherit;
  height: inherit;
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
  
   /* .screen_size{
        @media only screen and (max-width: 699px){
      float: left;
    }
      @media only screen and (min-width: 700px){
      float: right;
    }  
  }*/  
  @keyframes cursorBlink {
    49% { background-color: #e0a141; }
    50% { background-color: transparent; }
    99% { background-color: transparent; }
  }
</style>
