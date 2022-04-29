<template>
<section style="height: 100%;width: 100%;margin-bottom: 56px">
    <v-container style="height: 100%;" :style="isXs ? 'width: 100%' : 'width: 70%'">
      <v-row justify="center" align="center" class="my-1">
          <div class="font-weight-light" :class="isXs ? 'text-h4' : 'text-h3'" style="color : #e0a141">
            Avant de continuer, nous serions ravis de vous connaitre.
          </div>
      </v-row>
        <!--
      <v-row style="height : 30%">
      </v-row>
            -->
      <v-row justify="center" align="center">
          <transition name="fade">
              <form-connexion-section 
                :oldUserInfo="userInfo"
                @emitUserInfoSubmited="userInfoSubmited"
                />
          </transition>
          <!--
          <transition name="fade">
              <form-finishing-connexion-section v-if="progression == 6"/>
          </transition>
            -->
      </v-row>
      <v-row class="elevation-20" style="height : 5vh; position: fixed; width: 100vw; bottom: 0; left: 0;background-color : white; border-radius: 10px;" no-gutters align-content="center">
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
<!--
      <v-row style="height : 5%;" no-gutters class="mt-9" align-content="center">
        <v-col class="pr-1" cols="1">
          <v-btn
                color="#e0a141"
                dark
                outlined
                block
                class="px-0 white-background"
                @click="goBack"
              >
              &lt;
          </v-btn>
        </v-col>
        <v-col cols="10" class="fill-height">
          <v-row no-gutters style="height :100%;" align-content="center">
              <v-col class="py-2" :cols="progression" style="background-color : #e0a141; border-radius : 5px"/>
              <v-col class="py-2" :cols="12 - progression" style="background-color : #FFFFFF; border-radius : 5px"/>
          </v-row>
        </v-col>
        <v-col class="pl-1" cols="1">
          <v-btn
                outlined
                color="#e0a141"
                dark
                block
                class="px-0 white-background"
                @click="goNext"
              >
              &gt;
          </v-btn>
        </v-col>
      </v-row>
      -->
    </v-container>
</section>
</template>

<script>
import FormConnexionSection from '../components/FormConnexionSection.vue';
import FormFinishingConnexionSection from '../components/FormFinishingConnexionSection.vue';
import Projects from '../../api/collections/Projects'

export default {
  components: { 
    FormConnexionSection,
    FormFinishingConnexionSection,
  },
  data() {
    return {
      currentProjectId :'',
      isXs : false,
      isCurrentProjectLoad : false,
      situations : [
          "Etudiant",
          "Salarié",
          "PDG",
          "Auto-entrepreneur",
          "Autre"
      ],
      //progrssion : 0->12
      progression : 0,

      //projectinfo
      userInfo : {
        userFirstName : '',
        userLastName : '',
        userMail : '',
        userTel : '',
        userSituation : '',
        termAndCondition : false
      }
    
    }
  },
  methods : {
    onResize() {
        this.isXs = window.outerWidth < 850;
    },
    userInfoSubmited(userInfo) {
        this.userInfo = userInfo
        this.progression = 6
        this.currentProjectId = this.$cookies.get("currentProjectId")
        if (typeof this.currentProjectId != 'undefined' && this.currentProjectId != '' && this.currentProjectId != null) {
            Meteor.call('updateProjectUserInfoById', 
                this.currentProjectId, 
                {
                    userFirstName : this.userInfo.userFirstName,
                    userLastName : this.userInfo.userLastName,
                    userMail : this.userInfo.userMail,
                    userTel : this.userInfo.userTel,
                    userSituation : this.userInfo.userSituation,
                    termAndCondition : this.userInfo.termAndCondition
                }, 
                (error, docAffected) => {
                    if (!error){
                        if (docAffected != 1) {
                          this.$cookies.set("currentProjectId", docAffected)
                        }
                        this.isCurrentProjectLoad = false
                    } else {
                        console.log(error);
                    }
                }
            )
        } else {
          console.log('cant update project try to create one', userInfo);
          Meteor.call('createProject', this.userInfo, (error, newProj) => {
            if (!error){
              this.$cookies.set("currentProjectId", newProj)
            } else {
              console.log(error);
            }
          })
        }
    },
    goBack() {
      switch (this.progression) {
        case 6:
            this.isCurrentProjectLoad = false
            this.progression = 0
            break;
        default:
            this.progression = 0
            break;
      }
      this.$router.push({path :'/form/project'})
    },
    goNext() {
        this.$router.push({path :'/form/reussir'})
    }
  },
  meteor : {
    currentProject () {
      var myCurrentProjectInfo = Projects.find().fetch()[0]
      if (!this.isCurrentProjectLoad && myCurrentProjectInfo && this.projectInfo != myCurrentProjectInfo){
        this.userInfo = myCurrentProjectInfo
        this.isCurrentProjectLoad = true
      }
      return this.projectInfo
    }
  },
  mounted() {
    this.$vuetify.goTo(0);
    this.currentProjectId = this.$cookies.get("currentProjectId")
    this.$subscribe('projects', [this.currentProjectId])

    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
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