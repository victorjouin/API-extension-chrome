<template>
<section id="ourcompany">
  <v-container fluid>
      <v-row justify="center" class="ma-0">
        <v-col :cols="isXs ? 12 : 10">
                      <h1 class="font-weight-light display-2 text-h4" style="color : #e0a141" v-html="componentData.title">          
                      </h1>
                    <v-row class="mt-3">
                        <h3 class="font-weight-light text-justify" v-html="componentData.subtitle">
                            
                        </h3>
                    </v-row>
                    <v-row class="py-4">
                        <v-img 
                            elevation="2"
                            src="/assets/img/team.webp"
                            :max-width="isXs ? '100%' : '70%'"
                            class="d-block ml-auto mr-auto"
                        ></v-img>
                    </v-row>
                    <v-row justify="center">
                      <v-btn
                          :block="isXs"
                          color="primary"
                          large
                          dark
                          class="mt-5"
                          :to="{ path:'/form/project'}"
                        >
                          {{componentData.buttonText}}
                        </v-btn>
                    </v-row>
            </v-col>
                    </v-row>
    </v-container>

    <div class="svg-border-rounded text-light pt-2">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="#f4f7f5"
      >
        <path
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
</section>
</template>

<script>
export default {
  props: {
    isXs: {default : false},
    componentData : {
      default : function() {
        return {
          title : "Des experts certifiés",
          subtitle :"&nbsp;Nos experts certifiés vous accompagnent pour transformer votre idée en projet à succès ! Ils développent avec vous et vos usagers des offres qui apportent de la valeur ajoutée à vos clients et collaborateurs.",
          videoId : "1rsPygCRHDA",
          buttonText : "Contactez-nous"
        }
      }
    }
  },
data() {
    return {
      features: [
        {
          img: "/assets/img/team.webp",
          title: "Des experts certifiés",
          text: "Nos experts certifiés vous accompagnent pour transformer votre idée en projet à succès !\nIls développent avec vous et vos usagers des offres qui apportent de la valeur ajoutée à vos clients et collaborateurs.",
        },
        {
          img: "",
          title: "La communauté des entrepreneurs innovants",
          text: "Rencontrez nos experts et entrepreneurs sur Paris, Lyon, Bordeaux et Marseille. Pour faire avancer votre projet ,créer des synergies entre les entrepreneurs, ou simplement prendre un café en discutant de vos problématiques d’entrepreneur.",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  transition: all 0.5s ease;

  .triangle {
    transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
#ourcompany {
    background-color: white;
    margin-bottom: -12px ;
}
</style>

<style scoped>

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
.svg-border-waves .v-image {
  left: 0;
  bottom: 0;
  margin-bottom: -12px;
  position: absolute;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

</style>

<style>

section {
  position: relative;
}
</style>
