<template>
  <section id="hero">
    <v-parallax src="/assets/img/bgHero.webp" height="fit-content" class="ma-0 pa-0">
    <v-container fluid>
      <v-row class="mb-0 px-3 gray-background-filter" align="center" justify="center">
        <v-col :cols="isXs ? '12' : '10'">
          <v-row class="my-8" style="width : 100%" align="center" justify="center" no-gutters>
            <v-col :class="isXs ? 'my-3' :'pr-2'" :cols="isXs ? 12 : 6">
              <h2 class="display-1 mb-5" style="color:#FFFFFF" v-html="componentData.title"></h2>
              <div class="font-weight-light" :class="isXs ? 'text-h6' : 'text-h5'">
                <span v-if="!isXs" v-html="componentData.subtitleFirstPart">
                </span>
                <br>
                <span v-html="componentData.subtitleSecondPart">

                </span>
              </div>
            </v-col>
            <v-col :cols="isXs ? 12 : 6" :class="isXs ? '' :'pa-2'">
              <video width="100%" controls :src="componentData.videoId" poster="/assets/img/trailer_poster.webp"></video>
              <!--
            <youtube
              :player-vars="{ autoplay: 0 }"
              player-width="100%"
              :player-height="playerHeight"
              :video-id="componentData.videoId"
            ></youtube>-->
            </v-col>
          </v-row>
        
          <v-row align="center" justify="center">
            <!--
          <a href="mailto:contact.tooap@gmail.com">
          </a>
              -->
              <v-btn
                color="#e0a141"
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

      <div class="svg-border-waves gray-background-filter">
        <v-img src="/assets/img/borderWaves.svg" />
      </div>
    </v-parallax>
    <!--
    <v-container v-if="features" fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
             <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> 
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
            -->
    <!--
    <div class="svg-border-waves">
      <img src="/assets/img/wave2.svg" />
    </div>
    -->
  </section>
</template>

<script>
export default {
  props : {
    isXs : {
      default : false
    },
    componentData : {
      default : function() {
        return {
          title : "Financez & développez votre projet avec un <b>expert de la tech</b>",
          subtitleFirstPart :"Du développement d’App, au marketing et au design de votre service.",
          subtitleSecondPart : "Un accompagnement de A à Z avec votre expert Startup-Elevator.",
          videoId : "/assets/vid/StartupElevatorTrailer.webm",
          buttonText : "Démarrer mon projet"
        }
      }
    }
  },

  data() {
    return {
      dialog: false,
      features: [
        {
          img: "/assets/img/icon2.png",
          title: "Design Limpo",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          img: "/assets/img/icon1.png",
          title: "Dados Seguros",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          img: "/assets/img/icon3.png",
          title: "Código Aberto",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause();
      }
    },
  },
  methods: {
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
  },
  computed : {
    playerHeight() {
      return window.innerHeight / 3
    }
  }
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
</style>

<style>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  left: 0;
  width: 100%;
  z-index: -1;
}

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

.v-parallax__content {
  padding: 0 !important;
}

.gray-background-filter {
  /*backdrop-filter: blur(150px) contrast(0.75) grayscale(100%) invert(70%) opacity(0.9);*/
}
</style>

<style>
section {
  position: relative;
}
</style>
