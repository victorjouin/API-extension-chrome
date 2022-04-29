<template>
  <v-container fluid style="background-color:transparent">
    <v-row v-if="title!=''" justify="center" align="center">
        <v-col cols="12">
            <h2 class="font-weight-light" style="color : #e0a141">{{title}}</h2>
        </v-col>
    </v-row>
      <v-row justify="center" align="center">
            <v-row justify="center" align="center" style="max-width : 100vw" v-if="questionTitle != ''">
                <v-col :cols="isXs ? 11 : 6">
                    <h3 class="font-weight-light text-justify" v-html="questionTitle">
                    </h3>
                </v-col>
            </v-row>
            <v-col :cols="isXs ? 11 : 6">
                <v-row v-if="type=='dropdown'" class="mt-1" justify="center" align="center">
                    <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                color="primary"
                                dark
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                max-width="90vw"
                                >
                                <v-row justify="space-around" align="center">
                                    <span class="text-center" style="max-width:80vw; overflow: hidden"> {{userAnswer != '' ? userAnswer : 'Séléctionner ici'}}</span>
                                    <span>&nbsp;<v-icon>mdi-menu-down</v-icon></span>
                                </v-row>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="(questionItem, index) in questionItems"                                   
                                    :key="index"
                                    @click="userAnswer = questionItem; userAnswerIndex = index;"
                                >
                                <v-list-item-title>{{ questionItem }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                </v-row>
                <v-row v-else-if="type=='textfield'" justify="center" align="center">
                        <v-textarea rows=2 @blur="onMouseOutTextField" :label="textFieldPrefix != '' ? textFieldPrefix +' :' : ''" v-model="textFieldModel" :suffix="textFieldSuffix" :placeholder="textFieldPlaceholder">
                        </v-textarea>
                </v-row>
                <v-row v-else-if="type=='rating'" justify="center" align="center">
                    <v-col cols="12" class="pa-0 text-center">
                        <v-rating
                            background-color="gray lighten-2"
                            color="primary"
                            empty-icon="mdi-star-outline"
                            full-icon="mdi-star"
                            half-icon="mdi-star-half-full"
                            hover
                            large
                            length="5"
                            :value="ratingModel"
                            @input="ratingChanged"
                        ></v-rating>
                    </v-col>
                    <v-col cols="12" class="pa-0 text-center">
                        <div class="text-caption font-weight-light">
                            <span :style="ratingModel == 1 ? 'color : #e0a141' : 'display : none'">Je ne sais pas</span> 

                            <span :style="ratingModel == 2 ? 'color : #e0a141' : 'display : none'">Pas du tout</span>

                            <span :style="ratingModel == 3 ? 'color : #e0a141' : 'display : none'">Plutôt</span>

                            <span :style="ratingModel == 4 ? 'color : #e0a141' : 'display : none'">Oui</span>

                            <span :style="ratingModel == 5 ? 'color : #e0a141' : 'display : none'">Tout à fait</span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
      </v-row>

    <v-row justify="center" align="center" v-if='descriptionItems && descriptionItems.length > 0'>
          <v-col class="mt-2" cols="12">
                <v-expansion-panels focusable>
                    <v-expansion-panel v-if="type=='dropdown' && userAnswer != 'Séléctionner ici' && userAnswer != '' && descriptionItems[userAnswerIndex] != ''" block>
                        <v-expansion-panel-header 
                            disable-icon-rotate
                            expand-icon="mdi-help-circle"
                            >
                            <div class="d-inline-block text-truncate" v-html="descriptionItems[userAnswerIndex].includes('<br>') ? descriptionItems[userAnswerIndex].split('<br>')[0] : descriptionItems[userAnswerIndex]"></div>
                            </v-expansion-panel-header>
                        <v-expansion-panel-content v-html="descriptionItems[userAnswerIndex]"/>
                    </v-expansion-panel>
                    <v-expansion-panel v-else-if="(type=='textfield' || type=='rating') && descriptionItems.length > 0" block>
                        <v-expansion-panel-header 
                            disable-icon-rotate
                            expand-icon="mdi-help-circle"
                            >
                            <div class="d-inline-block text-truncate" v-html="descriptionItems[0].includes('<br>') ? descriptionItems[0].split('<br>')[0] : descriptionItems[0]"></div>
                            </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-for="(descriptionItem, index) in descriptionItems" :key="index">
                                <div class="font-weight-light mt-2" v-html="descriptionItem"/>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
          </v-col>
      </v-row>

  </v-container>
</template>

<script>
export default {
    props : {
        type: {default : 'textfield'},
        textFieldPrefix : { default : '' },
        textFieldPlaceholder : {default : '...'},
        textFieldSuffix : {default : ''},
        isXs : { default : true },
        title : { default : "" },
        questionTitle : { default : ""},
        questionItems : { default : () => { return [] }},
        descriptionItems : { default : () => { return [] }},
        initialValue : { default : "" }
    },
    data () {
        return {
            userAnswer : 'Séléctionner ici',
            userAnswerIndex : -1,
            textFieldModel : '',
            ratingModel :0
        }
    },
    methods : {
        onMouseOutTextField(){
            if (this.textFieldModel && this.textFieldModel.length > 0){
                this.$emit('emitUserAnswered', this.textFieldModel);
            }
        },
        ratingChanged(newVal){
            this.ratingModel = newVal
            this.$emit('emitUserAnswered', newVal)
        }
    },
    watch : {
        userAnswer(value) {
            if (value && value.length > 0){
                this.$emit('emitUserAnswered', value);
            }
        },
        initialValue(value) {
            if (value != ''){
                if (this.type == 'textfield') {
                    this.textFieldModel = value
                } else if (this.type == 'dropdown') {
                    this.userAnswer = value
                    this.userAnswerIndex = this.questionItems.indexOf(value)
                } 
            }    
        },
    },
    mounted() {
        if (this.initialValue != ''){
            if (this.type == 'textfield') {
                this.textFieldModel = this.initialValue
            } else if (this.type == 'dropdown') {
                this.userAnswer = this.initialValue
                this.userAnswerIndex = this.questionItems.indexOf(this.initialValue)
            } else if (this.type="rating") {
                this.ratingModel = this.initialValue
            }
        }
    }
    

}
</script>

<style scoped>
.background-question {
    background-image: url("/assets/img/helpCircleOutlineIcon.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: auto;
    width: auto;
}
</style>