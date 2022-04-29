<template>
  <section id="region">
    <v-container fluid style="background-color:#e0a141">
        <v-row justify="center" class="ma-0">
            <v-col :cols="isXs ? 12 : 10" class="white--text">
                    <h1 class="font-weight-light display-2 text-h4 my-4" v-html="componentData.title"></h1>
                <v-row justify="center">
                    <h3 class="font-weight-light text-justify" v-html="componentData.subtitleFirstPart">
                        
                    </h3>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" class="ma-0">
            <v-col :cols="isXs ? 12 : 10">
                <v-carousel
                    show-arrows-on-hover
                >
                    <v-carousel-item
                    v-for="(item,i) in itemsGroups"
                    :key="i"
                    :src="item"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row justify="center" class="mx-0 my-2">
            <v-col :cols="isXs ? 12 : 10" class="white--text">
                <h2 class="font-weight-light display-2 text-h4 my-4" v-html="componentData.subtitleSecondPart"></h2>
            </v-col>
        </v-row>
        <v-row :class="!isXs ? 'mx-3' : ''" justify="space-around">
            <v-col v-for="(city, index) in itemsCities"
                :cols="isXs ? 4 : 2"
                :key="index"
            >
                <v-card
                    class="d-flex"
                    max-height="auto"
                    max-width="100%"
                >
                    <v-img
                        max-height="auto"
                        max-width="100%"
                        cover 
                        aspect-ratio="1" 
                        :src="'/assets/img/'+city+'.webp'" 
                    >
                        <v-row
                            class="fill-height ma-0 text-capitalize text-bold"
                            align="center"
                            justify="center"
                            style="color : white"
                        >
                            <b class="px-1" style="backdrop-filter: blur(5px); text-shadow: 2px 2px black; border-radius: 5px;">{{city.toLowerCase()}}</b>
                        </v-row>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    isXs: {default : false},
    componentData : {
      default : function() {
        return {
          title : "Un réseau d'entrepreneurs et d'experts",
          subtitleFirstPart :"&nbsp; Pour réussir votre projet, collaborez avec d'autres entrepreneurs dans votre région sur Paris, Lyon, Bordeaux, ... . Notre matching vous permet de rencontrer un autre entrepreneur, pour faire avancer votre projet en binôme et créer des synergies. Discutez autour d'un café avec d'autres innovateurs, sortez de vos schémas de pensée et de l'isolement.",
          subtitleSecondPart : "Faites équipe avec d'autres innovateurs dans votre région",
        }
      }
    }
  },
  data() {
    return {
        itemsGroups : [
            "/assets/img/reunion-1.jpg",
            "/assets/img/Design-Thinking-Prototypage-Application-mobile-Lyon.jpeg",
            "/assets/img/Natural-solutions.jpeg",
            "/assets/img/reunion-3.png",
        ],
        itemsCities : [
            "BORDEAUX",
            "LILLE",
            "LYON",
            "PARIS",
            "STRASBOURG",
            "TOULOUSE",
        ]
    }
  }
}
</script>