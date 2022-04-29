<template>
<section style="height: 100%;width : 100%;margin-bottom: 56px">
    <v-container style="height: 100%;" :style="isXs ? 'width: 100%' : 'width: 70%'">
      <v-row justify="center" style="height : 15%" class="my-1">
          <div class="font-weight-light" :class="isXs ? 'text-h4' : 'text-h3'" style="color : #e0a141">Parlez nous de votre projet</div>
      </v-row>

      <v-row style="height : 30%">
        <v-col>
          <h4 class="font-weight-light text-h5" style="color : #616161"> Je souhaite créer 
            <span class="typed-text">{{ typeValue }}</span>
            <span v-if="domainSentence == ''" class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
          </h4>
        </v-col>
      </v-row>
      <!--
            <span>&nbsp;Je souhaite créer <strong>{{ wannaDoSentence != '' ? wannaDoSentence : '' }}</strong> {{ wannaDoSentence != '' ? 'dans le domaine' : ''}} <strong>{{ domainSentence != '' ? domainSentence : '' }}</strong>{{ domainSentence == '' ? '|' : '.'}}</span>
        -->
      <v-row justify="center" align="center" style="margin-bottom : 5vh">
        <transition name="fade">
        <form-wanna-do-question
          v-if="progression == 0"
          :questionTitle="wannaDoTitle"
          :buttons="wannaDoButtons"
          emitReference="userSelectedWannaDoSentence"
          :isXs="isXs"
          @userSelectedWannaDoSentence="userSelectedWannaDoSentence"
          />
        </transition>
        <transition name="fade">
        <form-wanna-do-question
          v-if="progression == 4"
          :questionTitle="domainTitle"
          :buttons="domainButtons"
          emitReference="userSelectedDomainSentence"
          :isXs="isXs"
          @userSelectedDomainSentence="userSelectedDomainSentence"
          />
        </transition>
        <transition name="fade">
          <form-project-info-section
            v-if="progression >= 8"
            :progression="progression"
            :projectNameOldValue="projectInfo.title"
            :projectDesciptionOldValue="projectInfo.description"
            @emitSubmitProjectInfo="submitProjectInfo"
          />
        </transition>
      </v-row>

      <v-row v-if="(progression > 0 || projectInfo.title != '')" class="elevation-20" style="height : 5vh; position: fixed; width: 100vw; bottom: 0; left: 0; background-color : white;border-radius: 10px;" no-gutters align-content="center">
        <v-col class="pr-1" cols="2">
          <v-btn
                color="#e0a141"
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
    </v-container>
</section>
</template>

<script>
import FormProjectInfoSection from '../components/FormProjectInfoSection.vue';
import FormWannaDoQuestion from '../components/FormWannaDoQuestion';
import Projects from '../../api/collections/Projects'

export default {
  components: { 
    FormWannaDoQuestion,
    FormProjectInfoSection,
  },
  data() {
    return {
      currentProjectId :'',
      isXs : false,
      isCurrentProjectLoad : false,
      //question projet
      wannaDoTitle : "Que souhaitez-vous créer ?",
      wannaDoButtons : [ 
        { 
          textButton : "App mobile",
          descrText : "une application mobile"   
        },
        { 
          textButton : "Site web",
          descrText : "un site web"   
        },
        { 
          textButton : "Une entreprise",
          descrText : "mon entreprise"   
        },
        { 
          textButton : "Un service",
          descrText : "un service"   
        },
        { 
          textButton : "commerce physique",
          descrText : "un commerce physique"   
        },
        { 
          textButton : "concept innovant",
          descrText : "un concept innovant"  
        },
      ],
      wannaDoSentence : "",
      domainTitle : "Dans quel domaine innovant ?",
      domainButtons : [ 
        { 
          textButton : "E-Commerce",
          descrText : "du e-commerce"   
        },
        { 
          textButton : "Éducation Tech",
          descrText : "de l'éducation tech"   
        },
        { 
          textButton : "Commerce classique",
          descrText : "des commerces classiques"   
        },
        { 
          textButton : "E-Santé",
          descrText : "de la e-santé"   
        },
        { 
          textButton : "FinTech",
          descrText : "des FinTech"   
        },
        { 
          textButton : "Autre",
          descrText : "autre"  
        },
      ],
      domainSentence : "",
      //progrssion : 0->12
      progression : 0,

      //text-typing
      typeValue: '',
      typeStatus: false,
      typeArray: [],
      typingSpeed: 100, //0 = instantané
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0,

      //projectinfo
      projectInfo : {
        title : '',
        description : '',
        type : '',
        domain : '',
        termAndCondition : false
      }
    
    }
  },
  methods : {
    userSelectedWannaDoSentence(sentence) {
      this.wannaDoSentence = sentence
      this.typeArray.push(sentence)
      this.typeArray.push(" dans le domaine ")
      this.typeText()
      this.progression = 4
    },
    userSelectedDomainSentence(sentence) {
      this.domainSentence = sentence
      this.typeArray.push(sentence+'.')
      this.typeText()
      this.progression = 8
    },
    onResize() {
        this.isXs = window.outerWidth < 850;
    },
    //textwritter
    async typeText() {
         this.typeArrayIndex = this.typeArray.length - 1
         if (this.estimatedTypeValue.length > this.typeValue.length){
           if(!this.typeStatus)
             this.typeStatus = true;
           this.typeValue += this.estimatedTypeValue.charAt(this.typeValue.length);
           this.charIndex += 1;
           setTimeout(this.typeText, this.typingSpeed);
         }
         else {
           this.typeStatus = false;
           //setTimeout(this.eraseText, this.newTextDelay);
         }
    },
    async eraseTextUntilIndex(indexLimit) {
        if(this.charIndex > indexLimit) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue = this.typeValue.substr(0, this.typeValue.length - 1);
          this.charIndex -= 1;
          setTimeout(() => { this.eraseTextUntilIndex(indexLimit) }, this.erasingSpeed);
        }
        else if (this.charIndex == 0){
            this.typeStatus = true;
          /*
          this.typeArrayIndex += 1;
          if(this.typeArrayIndex >= this.typeArray.length)
            this.typeArrayIndex = 0;
          setTimeout(this.typeText, this.typingSpeed + 1000);
          */
         } else {
           this.typeStatus = false;
        }
    },
    getTypeArrayTotalLengthUntilIndex(index) {
      var result = 0;
      if (this.typeArray.length > index){
        for (i in index) {
          result += this.typeArray[i].length
        }/*
        this.typeArray.forEach((value) => {
        })*/
      }
      return result
    },
    submitProjectInfo(newProjectInfo){
      this.projectInfo.title = newProjectInfo.title
      this.projectInfo.description = newProjectInfo.description
      this.projectInfo.type = this.wannaDoSentence
      this.projectInfo.domain = this.domainSentence
      this.projectInfo.termAndCondition = newProjectInfo.termAndCondition
      if (typeof this.currentProjectId != 'undefined' && this.currentProjectId != '') {
        Meteor.call('updateProjectInfoById', this.currentProjectId, this.projectInfo, (error, docAffected) => {
          if (!error){
            if (docAffected != 1) {
              this.$cookies.set("currentProjectId", docAffected)
            }
            this.isCurrentProjectLoad = false
            this.$router.push({path : '/form/profile'})
          } else {
            console.log(error);
          }
        })
      } else {
        Meteor.call('createProject', this.projectInfo, (error, newProj) => {
          if (!error){
            this.$cookies.set("currentProjectId", newProj)
            this.$router.push({path : '/form/profile'})
          } else {
            console.log(error);
          }
        })
      }
      this.progression = 12
    },
    goBack() {
      switch (this.progression) {
        case 12:
          this.progression = 8
          break;
        case 8:
          this.progression = 4
          this.eraseTextUntilIndex(this.typeValue.length - this.domainSentence.length - 1)
          this.typeArray.pop()
          this.domainSentence = ''
          break;
        case 4:
          this.progression = 0
          this.eraseTextUntilIndex(0)
          this.typeArray.pop()
          this.typeArray.pop()
          this.wannaDoSentence = ''
          break;
      
        default:
          break;
      }
    },
    goNext() {
      switch (this.progression) {
        case 12:
          this.$router.push({ path : '/form/profile'})
          break;
        case 8:
          this.progression = 12
          break;
        case 4:
          this.userSelectedDomainSentence(this.projectInfo.domain)
          this.progression = 8
          break;
        case 0:
          this.userSelectedWannaDoSentence(this.projectInfo.type)
          this.progression = 4
          break;
        default:
          break;
      }
    }
  },
  computed: {
    estimatedTypeValue() {
      var result = ""
      if (this.typeArray.isEmpty) {
        return ""
      }
      this.typeArray.forEach((value) => {
        result += value
      })
      return result
    },
  },
  meteor : {/*
    $subscribe: {
      'projects': [this.currentProjectId]
    },*/
    currentProject () {
      // You can also use Vue reactive data inside
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (typeof myCurrentProjectInfo != 'undefined' && !this.isCurrentProjectLoad && myCurrentProjectInfo && this.projectInfo != myCurrentProjectInfo){
        this.projectInfo = myCurrentProjectInfo
        this.isCurrentProjectLoad = true;
        if (this.projectInfo.type && this.projectInfo.type != this.wannaDoSentence) {
          this.wannaDoSentence = this.projectInfo.type
          this.typeArray.push(this.wannaDoSentence)
          this.typeArray.push(" dans le domaine ")
          this.progression = 4
          if (this.projectInfo.domain && this.projectInfo.domain != this.domainSentence) {
            this.domainSentence = this.projectInfo.domain
            this.typeArray.push(this.projectInfo.domain+'.')
            this.progression = 8
          }
          this.typeText()
        } else {
          this.$cookies.remove("currentProjectId")
        }
        if (this.projectInfo.title) {
          this.progression = 12
          //a RETRAVAILLER
          //this.$router.push({path :'/form/profile'})
        }
      }
      return this.projectInfo
    }
  },
  mounted() {
    this.$vuetify.goTo(0);
    //this.$cookies.set("currentProjectId", {title : "the title", description : "the desc"})
    this.currentProjectId = this.$cookies.get("currentProjectId") ?? ''
    this.$subscribe('projects', [this.currentProjectId])
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    //setTimeout(this.typeText, this.newTextDelay + 200);
  },
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